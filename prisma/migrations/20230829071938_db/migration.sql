-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "design" TEXT,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "rarity" DROP NOT NULL;
