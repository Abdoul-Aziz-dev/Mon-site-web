-- GSEAB School App - Database Initialization Script
-- Execute this script to create the database and all tables

-- Create Database
CREATE DATABASE IF NOT EXISTS gseab;
USE gseab;

-- Admin Table
CREATE TABLE `Admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Student Table
CREATE TABLE `Student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `class` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Teacher Table
CREATE TABLE `Teacher` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `subject` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Course Table
CREATE TABLE `Course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `level` VARCHAR(255) NOT NULL,
  `hours` VARCHAR(255) NOT NULL,
  `teacher` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Classroom Table
CREATE TABLE `Classroom` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `level` VARCHAR(255) NOT NULL,
  `mainTeacherId` INT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Enrollment Table
CREATE TABLE `Enrollment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `studentId` INT NOT NULL,
  `classroomId` INT NOT NULL,
  `courseId` INT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Enrollment_studentId_classroomId_courseId_key` (`studentId`, `classroomId`, `courseId`),
  FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`classroomId`) REFERENCES `Classroom`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Grade Table
CREATE TABLE `Grade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `studentId` INT NOT NULL,
  `courseId` INT NOT NULL,
  `teacherId` INT NOT NULL,
  `grade` DOUBLE NOT NULL,
  `type` VARCHAR(255) NOT NULL DEFAULT 'Contrôle',
  `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE CASCADE
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Schedule Table
CREATE TABLE `Schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `courseId` INT NOT NULL,
  `day` VARCHAR(255) NOT NULL,
  `startTime` VARCHAR(255) NOT NULL,
  `endTime` VARCHAR(255) NOT NULL,
  `room` VARCHAR(255),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Announcement Table
CREATE TABLE `Announcement` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `teacherId` INT NOT NULL,
  `classroomId` INT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`classroomId`) REFERENCES `Classroom`(`id`) ON DELETE SET NULL
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- StudentMessage Table
CREATE TABLE `StudentMessage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `senderId` INT NOT NULL,
  `recipientId` INT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`senderId`) REFERENCES `Student`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`recipientId`) REFERENCES `Student`(`id`) ON DELETE CASCADE
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- TeacherMessage Table
CREATE TABLE `TeacherMessage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `teacherId` INT NOT NULL,
  `studentId` INT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`),
  FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- News Table
CREATE TABLE `News` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Message Table
CREATE TABLE `Message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Session Table
CREATE TABLE `Session` (
  `id` VARCHAR(255) NOT NULL UNIQUE,
  `sessionToken` VARCHAR(255) NOT NULL UNIQUE,
  `userId` INT,
  `userEmail` VARCHAR(255),
  `userType` VARCHAR(255) NOT NULL DEFAULT 'student',
  `expires` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Settings Table
CREATE TABLE `Settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `siteName` VARCHAR(255) NOT NULL DEFAULT 'GSEAB',
  `contactEmail` VARCHAR(255),
  `contactPhone` VARCHAR(255),
  `address` VARCHAR(255),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE InnoDB DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create indexes for better performance
CREATE INDEX `Student_email_idx` ON `Student`(`email`);
CREATE INDEX `Teacher_email_idx` ON `Teacher`(`email`);
CREATE INDEX `Course_teacher_idx` ON `Course`(`teacher`);
CREATE INDEX `Grade_studentId_idx` ON `Grade`(`studentId`);
CREATE INDEX `Grade_courseId_idx` ON `Grade`(`courseId`);
CREATE INDEX `Enrollment_studentId_idx` ON `Enrollment`(`studentId`);
CREATE INDEX `Schedule_courseId_idx` ON `Schedule`(`courseId`);

-- Display confirmation
SELECT 'Database gseab created successfully!' as status;
