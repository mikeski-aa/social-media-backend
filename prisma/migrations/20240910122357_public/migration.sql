/*
  Warnings:

  - A unique constraint covering the columns `[likes]` on the table `comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[likes]` on the table `post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "comment_likes_key" ON "comment"("likes");

-- CreateIndex
CREATE UNIQUE INDEX "post_likes_key" ON "post"("likes");
