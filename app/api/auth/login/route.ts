import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Vérification selon le rôle avec timeout
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 3000)
    );

    if (role === 'Admin') {
      const admin = await Promise.race([
        prisma.admin.findUnique({ where: { email } }),
        timeout
      ]) as any;
      if (admin && admin.password === password) {
        return NextResponse.json({
          success: true,
          user: { id: admin.id, email: admin.email, role: 'admin', name: 'Administrateur' }
        });
      }
    } else if (role === 'Professeur') {
      const teacher = await Promise.race([
        prisma.teacher.findUnique({ where: { email } }),
        timeout
      ]) as any;
      if (teacher && teacher.password === password) {
        return NextResponse.json({
          success: true,
          user: { id: teacher.id, email: teacher.email, role: 'teacher', name: teacher.name }
        });
      }
    } else if (role === 'Etudiant') {
      const student = await Promise.race([
        prisma.student.findUnique({ where: { email } }),
        timeout
      ]) as any;
      if (student && student.password === password) {
        return NextResponse.json({
          success: true,
          user: { id: student.id, email: student.email, role: 'student', name: student.name, class: student.class }
        });
      }
    }

    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  } catch (error: any) {
    console.error('Erreur login:', error?.message || error);
    if (error?.message === 'Timeout') {
      return NextResponse.json({ error: 'Base de données non disponible' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
