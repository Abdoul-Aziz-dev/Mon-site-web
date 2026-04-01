import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let settings = await prisma.settings.findFirst();
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          siteName: "GSEAB",
          contactEmail: "contact@gseab.gn",
          updatedAt: new Date(),
        }
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des paramètres' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const existing = await prisma.settings.findFirst();
    
    let settings;
    if (existing) {
      settings = await prisma.settings.update({
        where: { id: existing.id },
        data: { ...body, updatedAt: new Date() }
      });
    } else {
      settings = await prisma.settings.create({
        data: { ...body, updatedAt: new Date() }
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour des paramètres' }, { status: 500 });
  }
}
