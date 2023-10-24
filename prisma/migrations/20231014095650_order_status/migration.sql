-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('processing', 'shipping', 'delivered');

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'processing';

-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);
