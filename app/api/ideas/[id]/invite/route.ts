import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/crypto";
import { sendInviteEmail } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idea = await prisma.ideaSubmission.findUnique({
      where: { id },
    });

    if (!idea) {
      return NextResponse.json({ error: "Idea submission not found" }, { status: 404 });
    }

    if (!idea.email) {
      return NextResponse.json({ error: "Submission has no email address" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: idea.email },
    });

    if (existingUser) {
      // If user exists, maybe we just mark it as reviewed
      await prisma.ideaSubmission.update({
        where: { id },
        data: { status: "CONTACTED" },
      });
      return NextResponse.json({ 
        message: "User already exists. Marked as contacted.",
        alreadyExists: true 
      });
    }

    // Check for existing pending invite
    const existingInvite = await prisma.invite.findFirst({
      where: {
        email: idea.email,
        status: "PENDING",
        expires: { gt: new Date() },
      },
    });

    if (existingInvite) {
      return NextResponse.json(
        { error: "An active invite already exists for this email" },
        { status: 400 }
      );
    }

    // Generate invite token
    const token = generateToken(32);
    const expires = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours

    // Create invite and update idea status in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const invite = await tx.invite.create({
        data: {
          email: idea.email!,
          token,
          expires,
          role: "USER",
          invitedById: session.user.id,
          message: `Hi ${idea.name}, I loved your idea for "${idea.title}"! I'd like to invite you to join GeekyZindagi as a Builder.`,
        },
      });

      await tx.ideaSubmission.update({
        where: { id },
        data: { status: "CONTACTED" },
      });

      return invite;
    });

    // Send invite email
    const emailResult = await sendInviteEmail(
      idea.email,
      token,
      `I loved your idea for "${idea.title}"! I'd like to invite you to join GeekyZindagi as a Builder.`
    );

    if (!emailResult.success) {
      // Note: We don't rollback the status update because the attempt was made
      // and we can retry sending the email if needed, but for simplicity:
      return NextResponse.json(
        { message: "Invite created but failed to send email. You may need to resend it manually.", inviteId: result.id },
        { status: 200 } // Return 200 because the database state was changed
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully invited Explorer as a Builder",
    });
  } catch (error) {
    console.error("Invite explorer error:", error);
    return NextResponse.json(
      { error: "Failed to process invite" },
      { status: 500 }
    );
  }
}
