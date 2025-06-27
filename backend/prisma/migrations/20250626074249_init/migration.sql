/*
  Warnings:

  - You are about to drop the `StaffMemberActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StaffMemberActivity" DROP CONSTRAINT "StaffMemberActivity_staffMemberId_fkey";

-- DropTable
DROP TABLE "StaffMemberActivity";

-- CreateTable
CREATE TABLE "StaffActivityLog" (
    "id" SERIAL NOT NULL,
    "staffMemberId" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StaffActivityLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StaffActivityLog" ADD CONSTRAINT "StaffActivityLog_staffMemberId_fkey" FOREIGN KEY ("staffMemberId") REFERENCES "StaffMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
