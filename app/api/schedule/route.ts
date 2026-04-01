import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      include: { course: true },
      orderBy: { day: 'asc' }
    });
    return NextResponse.json(schedules);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const schedule = await prisma.schedule.create({
      data: {
        courseId: body.courseId,
        day: body.day,
        startTime: body.startTime,
        endTime: body.endTime,
        room: body.room,
      },
      include: { course: true }
    });
    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
  }
}
