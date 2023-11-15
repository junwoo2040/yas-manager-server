-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "end" TIMESTAMP(3),
ADD COLUMN     "start" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "JoinUserShift" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "shiftId" UUID,

    CONSTRAINT "JoinUserShift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JoinUserShift" ADD CONSTRAINT "JoinUserShift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinUserShift" ADD CONSTRAINT "JoinUserShift_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
