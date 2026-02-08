import { NextResponse } from "next/server";
import { generateSecret, generateURI } from "otplib";
import * as QRCode from "qrcode";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "GeekyZindagi";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already has MFA enabled
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.mfaEnabled) {
      return NextResponse.json(
        { error: "MFA is already enabled" },
        { status: 400 }
      );
    }

    // Generate secret
    const secret = generateSecret();

    // Generate OTP Auth URL (TOTP format)
    const otpAuthUrl = generateURI({
      secret,
      issuer: APP_NAME,
      label: session.user.email,
      algorithm: "sha1",
      digits: 6,
      period: 30,
      strategy: "totp",
    });

    // Generate QR code as data URL
    const qrCode = await QRCode.toDataURL(otpAuthUrl);

    // Store encrypted secret temporarily (not in user record yet)
    // We'll move it to user record after verification
    const encryptedSecret = encrypt(secret);

    // Store temp secret in a separate collection or use session/cache
    // For simplicity, we'll store it in user's mfaSecret with a prefix
    await prisma.user.update({
      where: { id: session.user.id },
      data: { mfaSecret: `PENDING:${encryptedSecret}` },
    });

    return NextResponse.json({
      secret, // Show to user for manual entry
      qrCode,
      message: "Scan the QR code with your authenticator app",
    });
  } catch (error) {
    console.error("MFA setup error:", error);
    return NextResponse.json(
      { error: "Failed to setup MFA" },
      { status: 500 }
    );
  }
}
