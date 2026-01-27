import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  try {
    const workSession = await prisma.workSession.findFirst({
      where: {
        userId,
        endAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        site: {
          select: {
            name: true,
            enableValetResponsibilityModal: true,
            enableSmsRetrieval: true,
          },
        },
      },
    });
    return NextResponse.json(workSession);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
