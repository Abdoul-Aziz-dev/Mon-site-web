import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const studentMessages = await prisma.studentmessage.findMany({
      include: {
        student_studentmessage_senderIdTostudent: true,
        student_studentmessage_recipientIdTostudent: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    const teacherMessages = await prisma.teachermessage.findMany({
      include: { student: true, teacher: true },
      orderBy: { createdAt: 'desc' }
    });

    const formattedStudent = studentMessages.map(sm => ({
      id: sm.id,
      content: sm.content,
      sender: { id: sm.student_studentmessage_senderIdTostudent.id, name: sm.student_studentmessage_senderIdTostudent.name },
      recipient: { id: sm.student_studentmessage_recipientIdTostudent.id, name: sm.student_studentmessage_recipientIdTostudent.name },
      createdAt: sm.createdAt,
    }));

    const formattedTeacher = teacherMessages.map(tm => ({
      id: tm.id,
      content: tm.content,
      sender: { id: tm.student.id, name: tm.student.name },
      recipient: { id: tm.teacher.id, name: tm.teacher.name },
      createdAt: tm.createdAt,
    }));

    return NextResponse.json([...formattedStudent, ...formattedTeacher].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  } catch (error) {
    console.error('Erreur GET messages:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.senderId || !body.recipientId || !body.content) {
      return NextResponse.json({ error: 'Données manquantes (senderId, recipientId, content)' }, { status: 400 });
    }

    const sender = await prisma.student.findUnique({ where: { id: body.senderId } });
    if (!sender) {
      return NextResponse.json({ error: 'Expéditeur inexistant', studentId: body.senderId }, { status: 400 });
    }

    const teacherRecipient = await prisma.teacher.findUnique({ where: { id: body.recipientId } });

    if (teacherRecipient) {
      const message = await prisma.teachermessage.create({
        data: { studentId: body.senderId, teacherId: body.recipientId, content: body.content },
        include: { student: true, teacher: true }
      });
      return NextResponse.json({
        id: message.id,
        content: message.content,
        sender: { id: message.student.id, name: message.student.name },
        recipient: { id: message.teacher.id, name: message.teacher.name },
        createdAt: message.createdAt,
      }, { status: 201 });
    } else {
      const studentRecipient = await prisma.student.findUnique({ where: { id: body.recipientId } });
      if (!studentRecipient) {
        return NextResponse.json({ error: 'Destinataire inexistant' }, { status: 400 });
      }
      const message = await prisma.studentmessage.create({
        data: { senderId: body.senderId, recipientId: body.recipientId, content: body.content },
        include: {
          student_studentmessage_senderIdTostudent: true,
          student_studentmessage_recipientIdTostudent: true,
        }
      });
      return NextResponse.json({
        id: message.id,
        content: message.content,
        sender: { id: message.student_studentmessage_senderIdTostudent.id, name: message.student_studentmessage_senderIdTostudent.name },
        recipient: { id: message.student_studentmessage_recipientIdTostudent.id, name: message.student_studentmessage_recipientIdTostudent.name },
        createdAt: message.createdAt,
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Erreur POST messages:', error);
    return NextResponse.json({
      error: 'Erreur lors de l\'envoi',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}
