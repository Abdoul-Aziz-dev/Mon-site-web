const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debugLogin() {
  try {
    const email = 'aladji.diallo@gseab.gn';
    const password = '1234';
    
    console.log('=== DEBUG LOGIN ===\n');
    console.log(`Tentative de connexion avec:`);
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}\n`);
    
    const student = await prisma.student.findUnique({ where: { email } });
    
    if (!student) {
      console.log('✗ Aucun étudiant trouvé avec cet email\n');
      return;
    }
    
    console.log('✓ Étudiant trouvé:');
    console.log(`  ID: ${student.id}`);
    console.log(`  Name: ${student.name}`);
    console.log(`  Email: ${student.email}`);
    console.log(`  Password dans DB: "${student.password}"`);
    console.log(`  Password saisi: "${password}"`);
    console.log(`  Comparaison: ${student.password === password ? '✓ MATCH' : '✗ PAS DE MATCH'}\n`);
    
    if (student.password === password) {
      console.log('✓ LOGIN DEVRAIT FONCTIONNER\n');
    } else {
      console.log('✗ LOGIN VA ÉCHOUER - Les mots de passe ne correspondent pas\n');
    }
    
  } catch (error) {
    console.error('Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

debugLogin();
