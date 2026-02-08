import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role, message, portfolio } = body;

    if (!name || !email || !role || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const request = await prisma.mentorshipRequest.create({
      data: { name, email, role, message, portfolio },
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("Mentorship request error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
