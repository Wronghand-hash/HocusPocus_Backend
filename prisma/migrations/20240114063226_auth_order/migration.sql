/*
  Warnings:

  - A unique constraint covering the columns `[authority]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authority` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "authority" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Orders_authority_key" ON "Orders"("authority");
