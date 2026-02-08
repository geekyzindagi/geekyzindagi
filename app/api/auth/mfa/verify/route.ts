import { NextRequest, NextResponse } from "next/server";
import { verify } from "otplib";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { mfaVerifySchema } from "@/lib/validations/auth";
import { decrypt, hashToken } from "@/lib/crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedFields = mfaVerifySchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validatedFields.error.flatten() },
        { status: 400 }
      );
    }

    const { code } = validatedFields.data;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.mfaEnabled || !user.mfaSecret) {
      return NextResponse.json(
        { error: "MFA is not enabled" },
        { status: 400 }
      );
    }

    // Check if it's a TOTP code (6 digits) or backup code (8 chars)
    const isBackupCode = code.length === 8;

    if (isBackupCode) {
      // Verify backup code
      const hashedCode = hashToken(code.toUpperCase());
      const codeIndex = user.mfaBackupCodes.findIndex((c: string) => c === hashedCode);

      if (codeIndex === -1) {
        return NextResponse.json(
          { error: "Invalid backup code" },
          { status: 400 }
        );
      }

      // Remove used backup code
      const updatedCodes = [...user.mfaBackupCodes];
      updatedCodes.splice(codeIndex, 1);

      await prisma.user.update({
        where: { id: user.id },
        data: { mfaBackupCodes: updatedCodes },
      });

      return NextResponse.json({
        verified: true,
        message: "MFA verified with backup code",
        backupCodesRemaining: updatedCodes.length,
      });
    } else {
      // Verify TOTP code
      const secret = decrypt(user.mfaSecret);
      const isValid = verify({ token: code, secret, strategy: "totp" });

      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid verification code" },
          { status: 400 }
        );
      }

      return NextResponse.json({
        verified: true,
        message: "MFA verified successfully",
      });
    }
  } catch (error) {
    console.error("MFA verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify MFA" },
      { status: 500 }
    );
  }
}
