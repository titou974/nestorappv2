import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

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
    return NextResponse.json(
      { error: "Error fetching company..." },
      { status: 500 }
    );
  }
}
