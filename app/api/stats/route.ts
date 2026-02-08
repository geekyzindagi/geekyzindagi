import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/stats - Public endpoint for community stats
export async function GET() {
  try {
    // Count explorers (idea submissions that haven't converted yet)
    const explorersCount = await prisma.ideaSubmission.count({
      where: {
        convertedUserId: null,
      },
    });

    // Count builders (active users with BUILDER tier OR ADMIN/SUPER_ADMIN roles)
    const buildersCount = await prisma.user.count({
      where: {
        status: "ACTIVE",
        OR: [
          { memberTier: "BUILDER" },
          { role: { in: ["ADMIN", "SUPER_ADMIN"] } }
        ]
      },
    });

    // Count elders (active users with ELDER tier)
    const eldersCount = await prisma.user.count({
      where: {
        status: "ACTIVE",
        memberTier: "ELDER",
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
