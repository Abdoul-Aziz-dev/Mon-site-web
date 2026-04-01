import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      include: {
        teacher: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(announcements);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const announcement = await prisma.announcement.create({
      data: {
        title: body.title,
        content: body.content,
        teacherId: body.teacherId,
        classroomId: body.classroomId,
      },
      include: { teacher: true }
    });
    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
  }
}
