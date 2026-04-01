import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Admin
  const admin = await prisma.admin.upsert({
    where: { email: 'groupe8@gmail.com' },
    update: {},
    create: {
      email: 'groupe8@gmail.com',
      password: 'groupe8@@22',
    },
  });

  // Seed Teachers
  const teachers = [
    { name: 'M. Diallo Alpha', email: 'alpha.diallo@gseab.gn', subject: 'Mathématiques', phone: '+224 622 111 111' },
    { name: 'Mme. Barry Fatoumata', email: 'fatoumata.barry@gseab.gn', subject: 'Physique', phone: '+224 622 111 112' },
    { name: 'M. Sow Souleymane', email: 'souleymane.sow@gseab.gn', subject: 'Français', phone: '+224 622 111 113' },
    { name: 'Mme. Camara Aminata', email: 'aminata.camara@gseab.gn', subject: 'Anglais', phone: '+224 622 111 114' },
  ];

  const createdTeachers = [];
  for (const t of teachers) {
    const teacher = await prisma.teacher.upsert({
      where: { email: t.email },
      update: {},
      create: t,
    });
    createdTeachers.push(teacher);
  }

  // Seed Classrooms
  const classrooms = [
    { name: 'Terminale SM', level: 'Terminale' },
    { name: 'Terminale SE', level: 'Terminale' },
    { name: '10ème Année A', level: '10ème' },
    { name: '10ème Année B', level: '10ème' },
  ];

  const createdClassrooms = [];
  for (const c of classrooms) {
    const classroom = await prisma.classroom.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
    createdClassrooms.push(classroom);
  }

  // Seed Students
  const students = [
    { name: 'Mamadou Diallo', email: 'mamadou.diallo@gseab.gn', class: 'Terminale SM' },
    { name: 'Aissatou Sow', email: 'aissatou.sow@gseab.gn', class: 'Terminale SE' },
    { name: 'Oumar Barry', email: 'oumar.barry@gseab.gn', class: '10ème Année A' },
    { name: 'Fatoumata Camara', email: 'fatoumata.camara@gseab.gn', class: 'Terminale SM' },
    { name: 'Souleymane Diallo', email: 'souleymane.diallo@gseab.gn', class: '10ème Année B' },
  ];

  const createdStudents = [];
  for (const s of students) {
    const student = await prisma.student.upsert({
      where: { email: s.email },
      update: {},
      create: s,
    });
    createdStudents.push(student);
  }

  // Seed Courses
  const courses = [
    { title: 'Mathématiques - Analyse II', level: 'Terminale SM', hours: '4h / semaine', teacher: 'M. Diallo Alpha' },
    { title: 'Physique Quantique', level: 'Terminale SE', hours: '3h / semaine', teacher: 'Mme. Barry Fatoumata' },
    { title: 'Français - Littérature', level: 'Terminale', hours: '3h / semaine', teacher: 'M. Sow Souleymane' },
    { title: 'Anglais Technique', level: 'Terminale', hours: '2h / semaine', teacher: 'Mme. Camara Aminata' },
    { title: 'Algèbre 1', level: '10ème', hours: '4h / semaine', teacher: 'M. Diallo Alpha' },
  ];

  const createdCourses = [];
  for (const c of courses) {
    const course = await prisma.course.create({ data: c });
    createdCourses.push(course);
  }

  // Seed Enrollments
  for (let i = 0; i < Math.min(createdStudents.length, 3); i++) {
    for (let j = 0; j < Math.min(createdCourses.length, 2); j++) {
      await prisma.enrollment.create({
        data: {
          studentId: createdStudents[i].id,
          classroomId: createdClassrooms[0].id,
          courseId: createdCourses[j].id,
        },
      }).catch(() => {});
    }
  }

  // Seed Grades
  for (let i = 0; i < Math.min(createdStudents.length, 2); i++) {
    for (let j = 0; j < Math.min(createdCourses.length, 2); j++) {
      await prisma.grade.create({
        data: {
          studentId: createdStudents[i].id,
          courseId: createdCourses[j].id,
          teacherId: createdTeachers[j % createdTeachers.length].id,
          grade: Math.random() * 10 + 10,
          type: 'Contrôle',
          date: new Date(),
        },
      });
    }
  }

  // Seed Schedules
  const scheduleData = [
    { courseId: createdCourses[0].id, day: 'Lundi', startTime: '08:00', endTime: '10:00', room: 'Salle 101' },
    { courseId: createdCourses[1].id, day: 'Mardi', startTime: '10:15', endTime: '12:15', room: 'Salle 102' },
    { courseId: createdCourses[2].id, day: 'Mercredi', startTime: '14:00', endTime: '16:00', room: 'Salle 103' },
  ];

  for (const s of scheduleData) {
    await prisma.schedule.create({ data: s });
  }

  // Seed Announcements
  await prisma.announcement.create({
    data: {
      title: 'Réunion parents-profs',
      content: 'La réunion parents-profs aura lieu le 10 avril à 15h. Soyez à l\'heure!',
      teacherId: createdTeachers[0].id,
      classroomId: createdClassrooms[0].id,
    },
  });

  // Seed News
  const news = [
    { title: 'Rentrée 2024', content: 'Bienvenue à tous les nouveaux élèves! Cette année sera riche en innovations pédagogiques.' },
    { title: 'Succès au BAC', content: 'Taux de réussite record cette année: 98%! Félicitations à tous nos élèves.' },
    { title: 'Nouveaux équipements', content: 'Nos laboratoires informatiques ont été entièrement rénovés.' },
  ];

  for (const n of news) {
    await prisma.news.create({ data: n });
  }

  // Seed Settings
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      siteName: 'GSEAB',
      contactEmail: 'contact@gseab.gn',
      contactPhone: '+224 622 000 000',
      address: 'Conakry, Guinée',
      updatedAt: new Date(),
    },
  });

  console.log({ admin, teachers: createdTeachers.length, classrooms: createdClassrooms.length, students: createdStudents.length });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
