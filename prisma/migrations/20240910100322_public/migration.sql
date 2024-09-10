/*
  Warnings:

  - You are about to drop the column `likes` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comment" DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "likes";
