/*
  Warnings:

  - You are about to drop the column `owner` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "owner",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "fullname" TEXT,
ADD COLUMN     "region" TEXT,
ALTER COLUMN "totalPrice" DROP NOT NULL,
ALTER COLUMN "totalPrice" SET DATA TYPE TEXT,
ALTER COLUMN "estimatedDeliveryDays" DROP NOT NULL,
ALTER COLUMN "adderss" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "postal_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orderItems" ADD COLUMN     "items" JSONB;
