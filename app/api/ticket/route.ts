import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { siteId } = await req.json();

  try {
    const newUser = await prisma.user.create({
      data: {
        role: "CLIENT",
      },
    });
    const newTicket = await prisma.ticket.create({
      data: {
        userId: newUser.id,
        restaurantId: siteId,
        scannedAt: new Date(),
      },
    });
    return NextResponse.json({ ticketId: newTicket.id });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Error creating ticket..." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
