import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const teacherId = parseInt(id);

    if (isNaN(teacherId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const [studentMessages, adminMessages, admins] = await Promise.all([
      // Messages reçus des étudiants ET réponses envoyées par le prof
      prisma.teachermessage.findMany({
        where: { teacherId },
        include: { student: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'asc' }
      }),
      prisma.adminteachermessage.findMany({
        where: { teacherId },
        orderBy: { createdAt: 'asc' }
      }),
      prisma.admin.findMany({ select: { id: true, email: true } })
    ]);

    const adminMap = Object.fromEntries(admins.map(a => [a.id, a]));

    const formattedMessages = [
      ...studentMessages.map(msg => ({
        id: msg.id,
        type: 'student-teacher' as const,
        content: msg.content,
        sender: { id: msg.student.id, name: msg.student.name, role: 'student' as const },
        createdAt: msg.createdAt
      })),
      ...adminMessages.map(msg => ({
        id: msg.id,
        type: 'admin-teacher' as const,
        content: msg.content,
        sender: { id: msg.adminId, name: adminMap[msg.adminId]?.email || 'Admin', role: 'admin' as const },
        createdAt: msg.createdAt
      }))
    ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error('Erreur messages teacher:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}
