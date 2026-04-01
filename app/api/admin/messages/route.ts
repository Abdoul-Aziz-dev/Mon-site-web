import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const adminTeacherMessages = await prisma.adminteachermessage.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const adminStudentMessages = await prisma.adminstudentmessage.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Récupérer les admins, teachers, students pour les noms
    const [admins, teachers, students] = await Promise.all([
      prisma.admin.findMany(),
      prisma.teacher.findMany(),
      prisma.student.findMany(),
    ]);

    const adminMap = Object.fromEntries(admins.map(a => [a.id, a]));
    const teacherMap = Object.fromEntries(teachers.map(t => [t.id, t]));
    const studentMap = Object.fromEntries(students.map(s => [s.id, s]));

    const formattedTeacher = adminTeacherMessages.map(atm => ({
      id: atm.id,
      type: 'admin-teacher' as const,
      content: atm.content,
      sender: { id: atm.adminId, name: adminMap[atm.adminId]?.email || 'Admin', type: 'admin' as const },
      recipient: { id: atm.teacherId, name: teacherMap[atm.teacherId]?.name || 'Professeur', type: 'teacher' as const },
      createdAt: atm.createdAt,
    }));

    const formattedStudent = adminStudentMessages.map(asm => ({
      id: asm.id,
      type: 'admin-student' as const,
      content: asm.content,
      sender: { id: asm.adminId, name: adminMap[asm.adminId]?.email || 'Admin', type: 'admin' as const },
      recipient: { id: asm.studentId, name: studentMap[asm.studentId]?.name || 'Étudiant', type: 'student' as const },
      createdAt: asm.createdAt,
    }));

    return NextResponse.json([...formattedTeacher, ...formattedStudent].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  } catch (error) {
    console.error('Erreur GET admin messages:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.adminId || !body.recipientId || !body.content) {
      return NextResponse.json({ error: 'Données manquantes (adminId, recipientId, content)' }, { status: 400 });
    }

    if (!body.recipientType || !['teacher', 'student'].includes(body.recipientType)) {
      return NextResponse.json({ error: 'recipientType doit être "teacher" ou "student"' }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { id: body.adminId } });
    if (!admin) {
      return NextResponse.json({ error: 'Admin inexistant' }, { status: 400 });
    }

    if (body.recipientType === 'teacher') {
      const teacher = await prisma.teacher.findUnique({ where: { id: body.recipientId } });
      if (!teacher) return NextResponse.json({ error: 'Professeur inexistant' }, { status: 400 });

      const message = await prisma.adminteachermessage.create({
        data: { adminId: body.adminId, teacherId: body.recipientId, content: body.content }
      });

      return NextResponse.json({
        id: message.id,
        type: 'admin-teacher',
        content: message.content,
        sender: { id: admin.id, name: admin.email, type: 'admin' },
        recipient: { id: teacher.id, name: teacher.name, type: 'teacher' },
        createdAt: message.createdAt,
      }, { status: 201 });
    } else {
      const student = await prisma.student.findUnique({ where: { id: body.recipientId } });
      if (!student) return NextResponse.json({ error: 'Étudiant inexistant' }, { status: 400 });

      const message = await prisma.adminstudentmessage.create({
        data: { adminId: body.adminId, studentId: body.recipientId, content: body.content }
      });

      return NextResponse.json({
        id: message.id,
        type: 'admin-student',
        content: message.content,
        sender: { id: admin.id, name: admin.email, type: 'admin' },
        recipient: { id: student.id, name: student.name, type: 'student' },
        createdAt: message.createdAt,
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Erreur POST admin messages:', error);
    return NextResponse.json({
      error: 'Erreur lors de l\'envoi',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}
