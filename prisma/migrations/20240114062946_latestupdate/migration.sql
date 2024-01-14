/*
  Warnings:

  - You are about to drop the column `authority` on the `Orders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Orders_authority_key";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "authority";
