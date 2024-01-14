/*
  Warnings:

  - The `status` column on the `PaymentRecords` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `PaymentRecords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentRecords" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;
