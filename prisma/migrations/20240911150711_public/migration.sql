/*
  Warnings:

  - You are about to drop the column `requestorId` on the `request` table. All the data in the column will be lost.
  - Added the required column `requesterId` to the `request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "request" DROP CONSTRAINT "request_requestorId_fkey";

-- AlterTable
ALTER TABLE "request" DROP COLUMN "requestorId",
ADD COLUMN     "requesterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
