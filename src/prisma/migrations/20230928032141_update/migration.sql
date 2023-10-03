/*
  Warnings:

  - You are about to drop the column `inflow` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `outflow` on the `Record` table. All the data in the column will be lost.
  - Added the required column `check` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donor` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "inflow",
DROP COLUMN "outflow",
ADD COLUMN     "check" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "donor" TEXT NOT NULL,
ADD COLUMN     "productId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
