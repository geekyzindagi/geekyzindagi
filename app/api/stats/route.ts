import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/stats - Public endpoint for community stats
export async function GET() {
  try {
    // Count explorers (total ideas shared)
    const explorersCount = await prisma.ideaSubmission.count();

    // Count builders (active users with BUILDER tier OR ADMIN role)
    const buildersCount = await prisma.user.count({
      where: {
        status: "ACTIVE",
        OR: [
          { memberTier: "BUILDER" },
          { role: "ADMIN" }
        ]
      },
    });

    // Count elders (active users with ELDER tier OR SUPER_ADMIN role)
    const eldersCount = await prisma.user.count({
      where: {
        status: "ACTIVE",
        OR: [
          { memberTier: "ELDER" },
          { role: "SUPER_ADMIN" }
        ]
      },
    });

    return NextResponse.json({
      explorers: explorersCount,
      builders: buildersCount,
      elders: eldersCount,
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
