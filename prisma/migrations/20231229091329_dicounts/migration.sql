-- CreateTable
CREATE TABLE "Discounts" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "perc" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Discounts_pkey" PRIMARY KEY ("id")
);
