/*
  Warnings:

  - You are about to drop the column `payment_status` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `payment_type` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_code` on the `ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `is_active` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ticket_ticket_code_key";

-- AlterTable
ALTER TABLE "register_form" ADD COLUMN     "ticket_option" BOOLEAN;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "payment_status",
DROP COLUMN "payment_type",
DROP COLUMN "ticket_code",
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "discount_option" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ticket_user" (
    "id" SERIAL NOT NULL,
    "ticket_uid" TEXT NOT NULL,
    "ticket_no" INTEGER NOT NULL,
    "user_uid" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "payment_type" TEXT,
    "payment_status" TEXT,
    "use_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ticket_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "use_ticket" (
    "id" SERIAL NOT NULL,
    "ticket_user_id" INTEGER NOT NULL,
    "ticket_no" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "use_ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_user_ticket_uid_key" ON "ticket_user"("ticket_uid");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_user_ticket_no_key" ON "ticket_user"("ticket_no");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_uuid_key" ON "ticket"("uuid");

-- AddForeignKey
ALTER TABLE "ticket_user" ADD CONSTRAINT "ticket_user_ticket_uid_fkey" FOREIGN KEY ("ticket_uid") REFERENCES "ticket"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "use_ticket" ADD CONSTRAINT "use_ticket_ticket_user_id_fkey" FOREIGN KEY ("ticket_user_id") REFERENCES "ticket_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
