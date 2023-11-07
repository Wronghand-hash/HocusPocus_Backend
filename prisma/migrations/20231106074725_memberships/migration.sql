/*
  Warnings:

  - Added the required column `user_id` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullname" TEXT,
ADD COLUMN     "totalPrice" TEXT,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MembershipItem" (
    "id" SERIAL NOT NULL,
    "items" JSONB,
    "membership_id" INTEGER NOT NULL,

    CONSTRAINT "MembershipItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipItem" ADD CONSTRAINT "MembershipItem_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
