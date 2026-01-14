import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const site = await prisma.site.findMany();
    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
