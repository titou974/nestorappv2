import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const site = await prisma.restaurant.findMany();
    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching site...' });
  }
}
