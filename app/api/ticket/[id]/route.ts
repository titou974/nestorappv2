import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: id },
      include: { restaurant: true, user: true },
    });
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const json = await req.json();
  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: id },
      data: json,
    });
    return NextResponse.json(updatedTicket);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
