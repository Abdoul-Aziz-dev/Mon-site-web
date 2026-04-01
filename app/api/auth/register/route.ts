import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, role } = await request.json();

    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    // Bloquer la création de comptes admin
    if (role === 'Admin') {
      return NextResponse.json({ error: 'La création de comptes administrateur n\'est pas autorisée' }, { status: 403 });
    }

    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 3000)
    );

    if (role === 'Etudiant') {
      const existing = await prisma.student.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: 'Cet email existe déjà' }, { status: 400 });
      }

      const student = await Promise.race([
        prisma.student.create({
          data: {
            name: `${firstName} ${lastName}`,
            email,
            password,
            class: '6ème'
          }
        }),
        timeout
      ]) as any;

      return NextResponse.json({
        success: true,
        user: { id: student.id, email: student.email, role: 'student', name: student.name, class: student.class }
      });

    } else if (role === 'Professeur') {
      const existing = await prisma.teacher.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: 'Cet email existe déjà' }, { status: 400 });
      }

      const teacher = await Promise.race([
        prisma.teacher.create({
          data: {
            name: `${firstName} ${lastName}`,
            email,
            password,
            subject: 'Non défini',
            phone: null
          }
        }),
        timeout
      ]) as any;

      return NextResponse.json({
        success: true,
        user: { id: teacher.id, email: teacher.email, role: 'teacher', name: teacher.name }
      });
    }

    return NextResponse.json({ error: 'Rôle invalide' }, { status: 400 });

  } catch (error: any) {
    console.error('Erreur inscription:', error?.message || error);
    if (error?.message === 'Timeout') {
      return NextResponse.json({ error: 'Base de données non disponible' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
