-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_productId_fkey";

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
