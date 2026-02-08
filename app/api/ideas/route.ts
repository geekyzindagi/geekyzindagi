import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ideaSubmissionSchema } from "@/lib/validations/idea";
import { auth } from "@/lib/auth";

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // Max 5 submissions per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

// GET /api/ideas - Admin only: fetch all ideas
export async function GET() {
  try {
    const session = await auth();

    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ideas = await prisma.ideaSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(ideas);
  } catch (error) {
    console.error("Fetch ideas error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ideas" },
      { status: 500 }
    );
  }
}

// POST /api/ideas - Public endpoint to submit an idea
export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate input
    const validatedFields = ideaSubmissionSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validatedFields.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, title, description, techStack, nextSteps, lookingFor } =
      validatedFields.data;

    // Check for duplicate submissions (same email + title within 24 hours)
    if (email) {
      const recentSubmission = await prisma.ideaSubmission.findFirst({
        where: {
          email,
          title,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });

      if (recentSubmission) {
        return NextResponse.json(
          { error: "You've already submitted this idea recently." },
          { status: 409 }
        );
      }
    }

    // Create idea submission
    const idea = await prisma.ideaSubmission.create({
      data: {
        name,
        email: email || null,
        title,
        description,
        techStack,
        nextSteps,
        lookingFor,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your idea has been submitted! You're now an Explorer.",
        id: idea.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Idea submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit idea. Please try again." },
      { status: 500 }
    );
  }
}
