-- GSEAB School App - Seed Data Script
-- Execute this script AFTER running 01_init.sql

USE gseab;

-- Insert Admin
INSERT INTO `Admin` (`email`, `password`, `createdAt`) VALUES
('groupe8@gmail.com', 'groupe8@@22', NOW());

-- Insert Teachers
INSERT INTO `Teacher` (`name`, `email`, `subject`, `phone`, `createdAt`) VALUES
('M. Diallo Alpha', 'alpha.diallo@gseab.gn', 'Mathématiques', '+224 622 111 111', NOW()),
('Mme. Barry Fatoumata', 'fatoumata.barry@gseab.gn', 'Physique', '+224 622 111 112', NOW()),
('M. Sow Souleymane', 'souleymane.sow@gseab.gn', 'Français', '+224 622 111 113', NOW()),
('Mme. Camara Aminata', 'aminata.camara@gseab.gn', 'Anglais', '+224 622 111 114', NOW());

-- Insert Classrooms
INSERT INTO `Classroom` (`name`, `level`, `createdAt`) VALUES
('Terminale SM', 'Terminale', NOW()),
('Terminale SE', 'Terminale', NOW()),
('10ème Année A', '10ème', NOW()),
('10ème Année B', '10ème', NOW());

-- Insert Students
INSERT INTO `Student` (`name`, `email`, `class`, `createdAt`) VALUES
('Mamadou Diallo', 'mamadou.diallo@gseab.gn', 'Terminale SM', NOW()),
('Aissatou Sow', 'aissatou.sow@gseab.gn', 'Terminale SE', NOW()),
('Oumar Barry', 'oumar.barry@gseab.gn', '10ème Année A', NOW()),
('Fatoumata Camara', 'fatoumata.camara@gseab.gn', 'Terminale SM', NOW()),
('Souleymane Diallo', 'souleymane.diallo@gseab.gn', '10ème Année B', NOW());

-- Insert Courses
INSERT INTO `Course` (`title`, `level`, `hours`, `teacher`, `createdAt`) VALUES
('Mathématiques - Analyse II', 'Terminale SM', '4h / semaine', 'M. Diallo Alpha', NOW()),
('Physique Quantique', 'Terminale SE', '3h / semaine', 'Mme. Barry Fatoumata', NOW()),
('Français - Littérature', 'Terminale', '3h / semaine', 'M. Sow Souleymane', NOW()),
('Anglais Technique', 'Terminale', '2h / semaine', 'Mme. Camara Aminata', NOW()),
('Algèbre 1', '10ème', '4h / semaine', 'M. Diallo Alpha', NOW());

-- Insert Enrollments
INSERT INTO `Enrollment` (`studentId`, `classroomId`, `courseId`, `createdAt`) VALUES
(1, 1, 1, NOW()),
(1, 1, 2, NOW()),
(2, 2, 2, NOW()),
(2, 2, 3, NOW()),
(3, 3, 5, NOW()),
(3, 3, 3, NOW());

-- Insert Grades
INSERT INTO `Grade` (`studentId`, `courseId`, `teacherId`, `grade`, `type`, `date`, `createdAt`) VALUES
(1, 1, 1, 17.5, 'Contrôle', NOW(), NOW()),
(1, 2, 2, 15.0, 'Contrôle', NOW(), NOW()),
(2, 2, 2, 16.8, 'Examen', NOW(), NOW()),
(2, 3, 3, 18.5, 'Contrôle', NOW(), NOW()),
(3, 5, 1, 14.2, 'Contrôle', NOW(), NOW()),
(3, 3, 3, 16.0, 'Examen', NOW(), NOW());

-- Insert Schedules
INSERT INTO `Schedule` (`courseId`, `day`, `startTime`, `endTime`, `room`, `createdAt`) VALUES
(1, 'Lundi', '08:00', '10:00', 'Salle 101', NOW()),
(2, 'Mardi', '10:15', '12:15', 'Salle 102', NOW()),
(3, 'Mercredi', '14:00', '16:00', 'Salle 103', NOW()),
(4, 'Jeudi', '08:00', '09:30', 'Salle 104', NOW()),
(5, 'Vendredi', '09:45', '11:45', 'Salle 105', NOW());

-- Insert Announcements
INSERT INTO `Announcement` (`title`, `content`, `teacherId`, `classroomId`, `createdAt`) VALUES
('Réunion parents-profs', 'La réunion parents-profs aura lieu le 10 avril à 15h. Soyez à l''heure!', 1, 1, NOW()),
('Devoir Maison', 'Le devoir maison pour la semaine prochaine concerne les chapitres 3 et 4. À rendre le vendredi.', 1, 1, NOW()),
('Sortie pédagogique', 'Sortie pédagogique prévue le 15 avril au musée. Apportez votre cahier de notes.', 2, 2, NOW());

-- Insert News
INSERT INTO `News` (`title`, `content`, `createdAt`) VALUES
('Rentrée 2024', 'Bienvenue à tous les nouveaux élèves! Cette année sera riche en innovations pédagogiques.', NOW()),
('Succès au BAC', 'Taux de réussite record cette année: 98%! Félicitations à tous nos élèves.', NOW()),
('Nouveaux équipements', 'Nos laboratoires informatiques ont été entièrement rénovés avec les dernières technologies.', NOW());

-- Insert Messages (Contact form)
INSERT INTO `Message` (`name`, `email`, `content`, `createdAt`) VALUES
('Jean Dupont', 'jean@example.com', 'Bonjour, j''aimerais des informations sur les tarifs de scolarité.', NOW()),
('Marie Martin', 'marie@example.com', 'Pourriez-vous me contacter au sujet de l''inscription de mon enfant?', NOW());

-- Insert Settings
INSERT INTO `Settings` (`siteName`, `contactEmail`, `contactPhone`, `address`, `updatedAt`) VALUES
('GSEAB', 'contact@gseab.gn', '+224 622 000 000', 'Conakry, Guinée', NOW());

-- Display confirmation
SELECT 'Seed data inserted successfully!' as status;
