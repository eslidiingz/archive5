/*
  Warnings:

  - A unique constraint covering the columns `[promotion_code]` on the table `promotions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "promotions_promotion_code_key" ON "promotions"("promotion_code");
