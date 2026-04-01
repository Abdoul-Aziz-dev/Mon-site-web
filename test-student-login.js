const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testStudentRegistration() {
  try {
    console.log('=== CRÉATION DU COMPTE ÉLÈVE ===\n');
    
    // Vérifier si l'email existe déjà
    const existing = await prisma.student.findUnique({ 
      where: { email: 'aladji.diallo@gseab.gn' } 
    });
    
    if (existing) {
      console.log('✓ L\'élève existe déjà dans la base de données');
      console.log(`  ID: ${existing.id}`);
      console.log(`  Nom: ${existing.name}`);
      console.log(`  Email: ${existing.email}`);
      console.log(`  Mot de passe: ${existing.password}`);
      console.log(`  Classe: ${existing.class}\n`);
    } else {
      // Créer le nouvel élève
      const student = await prisma.student.create({
        data: {
          name: 'Aladji Diallo',
          email: 'aladji.diallo@gseab.gn',
          password: '1234',
          class: '6ème'
        }
      });
      
      console.log('✓ Élève créé avec succès !');
      console.log(`  ID: ${student.id}`);
      console.log(`  Nom: ${student.name}`);
      console.log(`  Email: ${student.email}`);
      console.log(`  Mot de passe: ${student.password}`);
      console.log(`  Classe: ${student.class}\n`);
    }
    
    console.log('=== TEST DE CONNEXION ===\n');
    
    // Simuler la connexion
    const loginStudent = await prisma.student.findUnique({
      where: { email: 'aladji.diallo@gseab.gn' }
    });
    
    if (loginStudent && loginStudent.password === '1234') {
      console.log('✓ CONNEXION RÉUSSIE !');
      console.log('  L\'élève peut accéder à son interface avec :');
      console.log('  - Email: aladji.diallo@gseab.gn');
      console.log('  - Mot de passe: 1234');
      console.log('  - Rôle: Élève');
      console.log(`\n  Données utilisateur retournées :`);
      console.log(`  {`);
      console.log(`    id: ${loginStudent.id},`);
      console.log(`    email: "${loginStudent.email}",`);
      console.log(`    role: "student",`);
      console.log(`    name: "${loginStudent.name}",`);
      console.log(`    class: "${loginStudent.class}"`);
      console.log(`  }\n`);
    } else {
      console.log('✗ ÉCHEC DE CONNEXION - Identifiants incorrects\n');
    }
    
  } catch (error) {
    console.error('Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testStudentRegistration();
