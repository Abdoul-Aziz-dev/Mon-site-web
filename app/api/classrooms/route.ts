import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const classrooms = await prisma.classroom.findMany({
      include: { enrollment: true },
      orderBy: { name: 'asc' }
    });
    // Renommer enrollment → enrollments pour la compatibilité frontend
    return NextResponse.json(classrooms.map(c => ({ ...c, enrollments: c.enrollment })));
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const classroom = await prisma.classroom.create({
      data: {
        name: body.name,
        level: body.level,
        mainTeacherId: body.mainTeacherId,
      }
    });
    return NextResponse.json(classroom, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
  }
}
