import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const company = await prisma.company.findUnique({
      where: { id: id },
    });
    return NextResponse.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Error fetching company..." },
      { status: 500 }
    );
  }
}
