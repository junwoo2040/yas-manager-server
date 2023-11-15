/*
  Warnings:

  - Added the required column `path` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Event_name_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "path" TEXT NOT NULL;
