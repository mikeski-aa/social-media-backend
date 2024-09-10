-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "likes" INTEGER[] DEFAULT ARRAY[1, 2, 3]::INTEGER[];

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "likes" INTEGER[] DEFAULT ARRAY[1, 2, 3]::INTEGER[];
