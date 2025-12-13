// app/api/site/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is NOT a Promise here
) {
  const { id } = await params;
  try {
    const site = await prisma.site.findUnique({
      where: { id },
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    return NextResponse.json(site);
  } catch (error) {
    console.error("Error fetching site:", error);
    return NextResponse.json(
      { error: "Error fetching site..." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
