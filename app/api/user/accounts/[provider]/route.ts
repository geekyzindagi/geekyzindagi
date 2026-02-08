import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { provider } = await params;

    // Get user's accounts
    const accounts = await prisma.account.findMany({
      where: { userId: session.user.id },
    });

    // Check if user has a password set
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    // Don't allow disconnecting if it's the only auth method
    if (accounts.length === 1 && !user?.password) {
      return NextResponse.json(
        {
          error:
            "Cannot disconnect the only authentication method. Add a password first.",
        },
        { status: 400 }
      );
    }

    // Find and delete the account
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404 }
      );
    }

    await prisma.account.delete({
      where: { id: account.id },
    });

    return NextResponse.json({
      message: `${provider} account disconnected successfully`,
    });
  } catch (error) {
    console.error("Disconnect account error:", error);
    return NextResponse.json(
      { error: "Failed to disconnect account" },
      { status: 500 }
    );
  }
}
