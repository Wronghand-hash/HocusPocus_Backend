/*
  Warnings:

  - You are about to drop the column `category` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "category",
DROP COLUMN "rarity";
