/*
  Warnings:

  - You are about to drop the column `image` on the `CoursesImages` table. All the data in the column will be lost.
  - Added the required column `buffer` to the `CoursesImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoursesImages" DROP COLUMN "image",
ADD COLUMN     "buffer" TEXT NOT NULL;
