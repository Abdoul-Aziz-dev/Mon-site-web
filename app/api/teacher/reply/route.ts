import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teacherId, studentId, content } = body;

    if (!teacherId || !studentId || !content?.trim()) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher) return NextResponse.json({ error: 'Enseignant inexistant' }, { status: 400 });

    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) return NextResponse.json({ error: 'Étudiant inexistant' }, { status: 400 });

    // Le prof répond → on crée un teachermessage (prof → étudiant)
    const message = await prisma.teachermessage.create({
      data: { teacherId, studentId, content },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Erreur réponse enseignant:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 });
  }
}
