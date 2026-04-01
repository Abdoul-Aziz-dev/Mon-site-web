const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePasswords() {
  try {
    console.log('Mise à jour des mots de passe...\n');

    await prisma.student.updateMany({
      data: { password: 'password123' }
    });
    console.log('✓ Mots de passe étudiants mis à jour');

    await prisma.teacher.updateMany({
      data: { password: 'password123' }
    });
    console.log('✓ Mots de passe professeurs mis à jour');

    console.log('\n=== IDENTIFIANTS DE CONNEXION ===\n');
    
    console.log('ÉTUDIANTS (mot de passe: password123):');
    const students = await prisma.student.findMany({ take: 5 });
    students.forEach(s => console.log(`  - ${s.email}`));

    console.log('\nPROFESSEURS (mot de passe: password123):');
    const teachers = await prisma.teacher.findMany({ take: 5 });
    teachers.forEach(t => console.log(`  - ${t.email}`));

    console.log('\nADMINS:');
    const admins = await prisma.admin.findMany();
    admins.forEach(a => console.log(`  - ${a.email} (mot de passe: ${a.password})`));

  } catch (error) {
    console.error('Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updatePasswords();
