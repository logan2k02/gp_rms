/*
  Warnings:

  - You are about to drop the column `password` on the `StaffMember` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `StaffMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StaffMember" DROP COLUMN "password",
ADD COLUMN     "passwordHash" TEXT NOT NULL;
