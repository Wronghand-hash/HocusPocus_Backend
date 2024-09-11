/*
  Warnings:

  - Added the required column `updated_at` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ForgottenPassword" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "token" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForgottenPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForgottenPassword_email_key" ON "ForgottenPassword"("email");
