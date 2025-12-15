import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const workSession = await prisma.workSession.findFirst({
      where: {
        id,
      },
      include: {
        site: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(workSession);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
