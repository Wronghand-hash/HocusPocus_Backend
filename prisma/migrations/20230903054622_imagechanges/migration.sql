/*
  Warnings:

  - You are about to drop the column `url` on the `ProductImages` table. All the data in the column will be lost.
  - Added the required column `buffer` to the `ProductImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `ProductImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductImages" DROP COLUMN "url",
ADD COLUMN     "buffer" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL;
