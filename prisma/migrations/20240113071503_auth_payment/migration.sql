/*
  Warnings:

  - A unique constraint covering the columns `[authority]` on the table `PaymentRecords` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authority` to the `PaymentRecords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentRecords" ADD COLUMN     "authority" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentRecords_authority_key" ON "PaymentRecords"("authority");
