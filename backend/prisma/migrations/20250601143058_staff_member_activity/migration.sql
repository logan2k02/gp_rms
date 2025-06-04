-- CreateTable
CREATE TABLE "StaffMemberActivity" (
    "id" SERIAL NOT NULL,
    "staffMemberId" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StaffMemberActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StaffMemberActivity" ADD CONSTRAINT "StaffMemberActivity_staffMemberId_fkey" FOREIGN KEY ("staffMemberId") REFERENCES "StaffMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
