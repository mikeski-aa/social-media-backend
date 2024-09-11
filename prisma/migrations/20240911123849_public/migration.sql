-- CreateTable
CREATE TABLE "request" (
    "id" SERIAL NOT NULL,
    "requestorId" INTEGER NOT NULL,
    "requesteeId" INTEGER NOT NULL,

    CONSTRAINT "request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_requestorId_fkey" FOREIGN KEY ("requestorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_requesteeId_fkey" FOREIGN KEY ("requesteeId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
