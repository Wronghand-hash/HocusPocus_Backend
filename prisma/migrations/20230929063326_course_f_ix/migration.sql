/*
  Warnings:

  - The `preview` column on the `Courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "preview",
ADD COLUMN     "preview" BYTEA;

-- CreateTable
CREATE TABLE "CoursesImages" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "CoursesImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoursesImages" ADD CONSTRAINT "CoursesImages_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
