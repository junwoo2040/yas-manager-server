/*
  Warnings:

  - Made the column `eventId` on table `Shift` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_eventId_fkey";

-- AlterTable
ALTER TABLE "Shift" ALTER COLUMN "eventId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
