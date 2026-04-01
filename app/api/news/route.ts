import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des actualités' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const news = await prisma.news.create({
      data: {
        title: body.title,
        content: body.content,
      }
    });
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de l\'actualité' }, { status: 500 });
  }
}
