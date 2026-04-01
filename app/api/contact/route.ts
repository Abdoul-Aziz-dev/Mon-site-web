import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = await prisma.message.create({
      data: {
        name: body.name,
        email: body.email,
        content: body.content,
      }
    });
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'envoi du message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
