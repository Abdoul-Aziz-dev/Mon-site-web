import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const news = await prisma.news.findUnique({
      where: { id: idNum }
    });
    if (!news) {
      return NextResponse.json({ error: 'Actualité non trouvée' }, { status: 404 });
    }
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await request.json();
    const news = await prisma.news.update({
      where: { id: idNum },
      data: {
        title: body.title,
        content: body.content,
      }
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    await prisma.news.delete({ where: { id: idNum } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
