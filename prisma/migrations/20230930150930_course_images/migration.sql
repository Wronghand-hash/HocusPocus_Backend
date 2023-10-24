/*
  Warnings:

  - Added the required column `filename` to the `CoursesImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoursesImages" ADD COLUMN     "filename" TEXT NOT NULL;
