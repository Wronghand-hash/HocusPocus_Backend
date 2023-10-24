/*
  Warnings:

  - You are about to drop the `Videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Videos";

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "file" BYTEA NOT NULL,
    "preview" TEXT,
    "title" TEXT,
    "trainer" TEXT,
    "price" TEXT,
    "description" TEXT,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);
