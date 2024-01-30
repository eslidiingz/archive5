/*
  Warnings:

  - You are about to drop the column `Deleted_at` on the `ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "Deleted_at",
ADD COLUMN     "deleted_at" TIMESTAMP(3);
