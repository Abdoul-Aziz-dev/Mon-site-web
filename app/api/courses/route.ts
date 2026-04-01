import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des cours' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const course = await prisma.course.create({
      data: {
        title: body.title,
        level: body.level,
        hours: body.hours,
        teacher: body.teacher,
      }
    });
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création du cours' }, { status: 500 });
  }
}
