import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await prisma.eventRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    const mentorships = await prisma.mentorshipRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ events, mentorships });
  } catch (error) {
    console.error("Fetch requests error:", error);
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}
