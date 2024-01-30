/*
  Warnings:

  - A unique constraint covering the columns `[ticket_code]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticket_code` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "ticket_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticket_code_key" ON "Ticket"("ticket_code");
