/*
  Warnings:

  - You are about to drop the `StaffUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "StaffUser";

-- CreateTable
CREATE TABLE "StaffMember" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "StaffRole" NOT NULL,

    CONSTRAINT "StaffMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffMember_username_key" ON "StaffMember"("username");
