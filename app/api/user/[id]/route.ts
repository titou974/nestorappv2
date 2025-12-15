import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const json = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: json,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
