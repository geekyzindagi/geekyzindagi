import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const invite = await prisma.invite.findUnique({
      where: { token },
      include: {
        invitedBy: {
          select: { name: true },
        },
      },
    });

    if (!invite) {
      return NextResponse.json(
        { error: "Invalid invite token", valid: false },
        { status: 404 }
      );
    }

    if (invite.status !== "PENDING") {
      return NextResponse.json(
        { error: "This invite has already been used or revoked", valid: false },
        { status: 400 }
      );
    }

    if (invite.expires < new Date()) {
      // Mark as expired
      await prisma.invite.update({
        where: { id: invite.id },
        data: { status: "EXPIRED" },
      });
      return NextResponse.json(
        { error: "This invite has expired", valid: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      email: invite.email,
      invitedBy: invite.invitedBy.name,
      message: invite.message,
      role: invite.role,
      expiresAt: invite.expires,
    });
  } catch (error) {
    console.error("Validate invite error:", error);
    return NextResponse.json(
      { error: "Failed to validate invite", valid: false },
      { status: 500 }
    );
  }
}
