import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des enseignants' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const teacher = await prisma.teacher.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        phone: body.phone,
      }
    });
    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de l\'enseignant' }, { status: 500 });
  }
}
