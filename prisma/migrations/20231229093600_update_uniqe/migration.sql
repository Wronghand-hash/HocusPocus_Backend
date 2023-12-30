/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Discounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Discounts_code_key" ON "Discounts"("code");
