import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const course = await prisma.course.findUnique({
      where: { id: idNum },
      include: {
        enrollment: true,
        grade: true,
        schedule: true,
      }
    });
    if (!course) {
      return NextResponse.json({ error: 'Cours non trouvé' }, { status: 404 });
    }
    return NextResponse.json(course);
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
    const course = await prisma.course.update({
      where: { id: idNum },
      data: {
        title: body.title,
        level: body.level,
        teacher: body.teacher,
        hours: body.hours,
      }
    });
    return NextResponse.json(course);
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
    await prisma.course.delete({ where: { id: idNum } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
