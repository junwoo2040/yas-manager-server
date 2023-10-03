/*
  Warnings:

  - You are about to drop the column `desc` on the `Task` table. All the data in the column will be lost.
  - Added the required column `buyer` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "buyer" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "eventId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "desc",
ADD COLUMN     "description" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
