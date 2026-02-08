import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, email, topic, details } = body;

    if (!type || !email || !topic || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const request = await prisma.eventRequest.create({
      data: { type, email, topic, details },
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("Event request error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
