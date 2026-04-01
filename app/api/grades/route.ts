import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const grades = await prisma.grade.findMany({
      include: {
        student: true,
        course: true,
        teacher: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(grades);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des notes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const grade = await prisma.grade.create({
      data: {
        studentId: body.studentId,
        courseId: body.courseId,
        teacherId: body.teacherId,
        grade: body.grade,
        type: body.type || 'Contrôle',
        date: body.date ? new Date(body.date) : new Date(),
      },
      include: {
        student: true,
        course: true,
        teacher: true,
      }
    });
    return NextResponse.json(grade, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la note' }, { status: 500 });
  }
}
