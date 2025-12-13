import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  try {
    const site = await prisma.site.findMany();
    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching site..." });
  }
}
