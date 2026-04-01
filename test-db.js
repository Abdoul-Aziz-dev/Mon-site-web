const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDB() {
  try {
    console.log('=== TEST ÉTUDIANTS ===');
    const students = await prisma.student.findMany({ take: 3 });
    students.forEach(s => {
      console.log(`Email: ${s.email} | Nom: ${s.name} | Classe: ${s.class}`);
    });

    console.log('\n=== TEST PROFESSEURS ===');
    const teachers = await prisma.teacher.findMany({ take: 3 });
    teachers.forEach(t => {
      console.log(`Email: ${t.email} | Nom: ${t.name}`);
    });

    console.log('\n=== TEST ADMINS ===');
    const admins = await prisma.admin.findMany();
    admins.forEach(a => {
      console.log(`Email: ${a.email} | Password: ${a.password}`);
    });
  } catch (error) {
    console.error('Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();
