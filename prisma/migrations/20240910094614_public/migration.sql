/*
  Warnings:

  - The `likes` column on the `comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `likes` column on the `post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "comment" DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "post" DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
