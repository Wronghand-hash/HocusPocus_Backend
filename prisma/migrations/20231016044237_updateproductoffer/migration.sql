/*
  Warnings:

  - You are about to drop the column `specialOffer` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "specialOffer",
ADD COLUMN     "special_offer" BOOLEAN DEFAULT false;
