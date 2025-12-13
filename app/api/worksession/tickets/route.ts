import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const siteId = req.nextUrl.searchParams.get("siteId") as string;
  const startDateString = req.nextUrl.searchParams.get("startDate") as string;
  console.log("coucou");
  const startDate = new Date(startDateString);

  try {
    const tickets = await prisma.site.findUnique({
      where: { id: siteId },
      select: {
        tickets: {
          where: {
            createdAt: { gte: startDate },
          },
        },
      },
    });
    console.log("tickets", tickets);
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
