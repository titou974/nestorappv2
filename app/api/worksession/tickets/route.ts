import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const siteId = req.nextUrl.searchParams.get("siteId") as string;
  const startDateString = req.nextUrl.searchParams.get("startedAt") as string;
  const workSessionId = req.nextUrl.searchParams.get("workSessionId") as string;
  const startDate = new Date(startDateString);
  try {
    const tickets = await prisma.site.findUnique({
      where: { id: siteId },
      select: {
        tickets: {
          where: {
            createdAt: { gte: startDate },
            workSessionId: workSessionId,
          },
        },
      },
    });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
