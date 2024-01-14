/*
  Warnings:

  - A unique constraint covering the columns `[authority]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "authority" TEXT NOT NULL DEFAULT 'none';

-- CreateIndex
CREATE UNIQUE INDEX "Orders_authority_key" ON "Orders"("authority");
