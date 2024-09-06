-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "likes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "likes" DROP NOT NULL;
