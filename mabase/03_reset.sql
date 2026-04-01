-- GSEAB School App - Database Reset Script
-- WARNING: This script will DELETE all data!
-- Use only for development/testing purposes

USE gseab;

-- Drop all tables
DROP TABLE IF EXISTS `StudentMessage`;
DROP TABLE IF EXISTS `TeacherMessage`;
DROP TABLE IF EXISTS `Session`;
DROP TABLE IF EXISTS `Grade`;
DROP TABLE IF EXISTS `Announcement`;
DROP TABLE IF EXISTS `Schedule`;
DROP TABLE IF EXISTS `Enrollment`;
DROP TABLE IF EXISTS `Message`;
DROP TABLE IF EXISTS `News`;
DROP TABLE IF EXISTS `Settings`;
DROP TABLE IF EXISTS `Classroom`;
DROP TABLE IF EXISTS `Course`;
DROP TABLE IF EXISTS `Student`;
DROP TABLE IF EXISTS `Teacher`;
DROP TABLE IF EXISTS `Admin`;

SELECT 'All tables dropped successfully!' as status;
