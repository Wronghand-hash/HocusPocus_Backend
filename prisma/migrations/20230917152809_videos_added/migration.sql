-- CreateTable
CREATE TABLE "Videos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "file" BYTEA NOT NULL,
    "title" TEXT,
    "trainer" TEXT,
    "price" TEXT,
    "description" TEXT,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);
