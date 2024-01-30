/*
  Warnings:

  - The `require` column on the `register_form` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "register_form" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "require",
ADD COLUMN     "require" BOOLEAN NOT NULL DEFAULT true;
