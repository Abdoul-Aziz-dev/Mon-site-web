import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const classroomId = parseInt(id);

    if (isNaN(classroomId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const classroom = await prisma.classroom.findUnique({
      where: { id: classroomId },
      include: {
        enrollment: {
          include: {
            student: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      }
    });

    if (!classroom) {
      return NextResponse.json({ error: 'Classe non trouvée' }, { status: 404 });
    }

    // Renommer enrollment → enrollments pour la compatibilité frontend
    return NextResponse.json({ ...classroom, enrollments: classroom.enrollment });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération de la classe' }, { status: 500 });
  }
}
