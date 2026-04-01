const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkPasswords() {
  try {
    console.log('=== VÉRIFICATION DES MOTS DE PASSE ===\n');
    
    const students = await prisma.student.findMany({ take: 3 });
    console.log('ÉTUDIANTS:');
    students.forEach(s => {
      console.log(`  Email: ${s.email}`);
      console.log(`  Password: ${s.password}`);
      console.log(`  Name: ${s.name}\n`);
    });

    const teachers = await prisma.teacher.findMany({ take: 3 });
    console.log('PROFESSEURS:');
    teachers.forEach(t => {
      console.log(`  Email: ${t.email}`);
      console.log(`  Password: ${t.password}`);
      console.log(`  Name: ${t.name}\n`);
    });

    const admins = await prisma.admin.findMany();
    console.log('ADMINS:');
    admins.forEach(a => {
      console.log(`  Email: ${a.email}`);
      console.log(`  Password: ${a.password}\n`);
    });

  } catch (error) {
    console.error('Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkPasswords();
