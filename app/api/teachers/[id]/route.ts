import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const teacher = await prisma.teacher.findUnique({
      where: { id: idNum },
      include: {
        announcement: true,
        grade: true,
      }
    });
    if (!teacher) {
      return NextResponse.json({ error: 'Enseignant non trouvé' }, { status: 404 });
    }
    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await request.json();
    const teacher = await prisma.teacher.update({
      where: { id: idNum },
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        phone: body.phone,
      }
    });
    return NextResponse.json(teacher);
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
    // Delete related records first
    await prisma.grade.deleteMany({ where: { teacherId: idNum } });
    await prisma.announcement.deleteMany({ where: { teacherId: idNum } });
    await prisma.teachermessage.deleteMany({ where: { teacherId: idNum } });
    // Now delete the teacher
    await prisma.teacher.delete({ where: { id: idNum } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression', details: String(error) }, { status: 500 });
  }
}
