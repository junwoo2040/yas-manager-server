/*
  Warnings:

  - You are about to drop the column `date` on the `Record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
