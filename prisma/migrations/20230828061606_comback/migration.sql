/*
  Warnings:

  - You are about to drop the column `rt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "rt",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "fullname" TEXT,
ADD COLUMN     "phonenumber" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "region" TEXT;
