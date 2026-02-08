import { NextRequest, NextResponse } from "next/server";
import { verify } from "otplib";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { mfaSetupSchema } from "@/lib/validations/auth";
import { decrypt, generateBackupCodes, hashToken } from "@/lib/crypto";
import { sendMfaEnabledEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedFields = mfaSetupSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validatedFields.error.flatten() },
        { status: 400 }
      );
    }

    const { token } = validatedFields.data;

    // Get user with pending MFA secret
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.mfaSecret || !user.mfaSecret.startsWith("PENDING:")) {
      return NextResponse.json(
        { error: "MFA setup not initiated. Please start setup again." },
        { status: 400 }
      );
    }

    // Decrypt the secret
    const encryptedSecret = user.mfaSecret.replace("PENDING:", "");
    const secret = decrypt(encryptedSecret);

    // Verify the token
    const isValid = verify({ token, secret, strategy: "totp" });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes(10);
    const hashedBackupCodes = backupCodes.map((code) => hashToken(code));

    // Enable MFA and store the verified secret
    await prisma.user.update({
      where: { id: user.id },
      data: {
        mfaEnabled: true,
        mfaSecret: encryptedSecret, // Remove PENDING prefix
        mfaBackupCodes: hashedBackupCodes,
      },
    });

    // Send confirmation email
    await sendMfaEnabledEmail(user.email!, user.name || undefined);

    return NextResponse.json({
      message: "MFA enabled successfully",
      backupCodes, // Show ONCE to user - they must save these!
    });
  } catch (error) {
    console.error("MFA verify setup error:", error);
    return NextResponse.json(
      { error: "Failed to verify MFA" },
      { status: 500 }
    );
  }
}
