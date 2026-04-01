import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await request.json();
    const student = await prisma.student.update({
      where: { id: idNum },
      data: {
        name: body.name,
        email: body.email,
        class: body.class,
      }
    });
    return NextResponse.json(student);
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    // Delete related records first due to cascade constraints
    await prisma.enrollment.deleteMany({ where: { studentId: idNum } });
    await prisma.grade.deleteMany({ where: { studentId: idNum } });
    await prisma.studentmessage.deleteMany({ where: { OR: [{ senderId: idNum }, { recipientId: idNum }] } });
    await prisma.teachermessage.deleteMany({ where: { studentId: idNum } });
    // Now delete the student
    await prisma.student.delete({ where: { id: idNum } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression', details: String(error) }, { status: 500 });
  }
}
