/*
  Warnings:

  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_registerform_uid_fkey";

-- DropTable
DROP TABLE "Ticket";

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "ticket_code" TEXT NOT NULL,
    "registerform_uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "limit_type" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "discount_option" BOOLEAN NOT NULL,
    "payment_type" TEXT,
    "payment_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "Deleted_at" TIMESTAMP(3),

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_ticket_code_key" ON "ticket"("ticket_code");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_registerform_uid_fkey" FOREIGN KEY ("registerform_uid") REFERENCES "register_form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
