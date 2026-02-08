import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inviteSchema } from "@/lib/validations/auth";
import { generateToken } from "@/lib/crypto";
import { sendInviteEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admins can send invites
    if (!["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validatedFields = inviteSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validatedFields.error.flatten() },
        { status: 400 }
      );
    }

    const { email, role, message } = validatedFields.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    // Check for existing pending invite
    const existingInvite = await prisma.invite.findFirst({
      where: {
        email,
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

    // Create invite
    const invite = await prisma.invite.create({
      data: {
        email,
        token,
        expires,
        role: role || "USER",
        message,
        invitedById: session.user.id,
      },
    });

    // Send invite email
    const emailResult = await sendInviteEmail(
      email,
      token,
      session.user.name || "An admin",
      message
    );

    if (!emailResult.success) {
      // Delete invite if email fails
      await prisma.invite.delete({ where: { id: invite.id } });
      return NextResponse.json(
        { error: "Failed to send invite email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Invite sent successfully",
        invite: {
          id: invite.id,
          email: invite.email,
          expires: invite.expires,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Invite error:", error);
    return NextResponse.json(
      { error: "Failed to send invite" },
      { status: 500 }
    );
  }
}

// Get all invites (admin only)
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const invites = await prisma.invite.findMany({
      include: {
        invitedBy: {
          select: { name: true, email: true },
        },
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ invites });
  } catch (error) {
    console.error("Get invites error:", error);
    return NextResponse.json(
      { error: "Failed to get invites" },
      { status: 500 }
    );
  }
}
