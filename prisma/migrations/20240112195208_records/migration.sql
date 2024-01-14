-- CreateTable
CREATE TABLE "PaymentRecords" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "amount" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "PaymentRecords_pkey" PRIMARY KEY ("id")
);
