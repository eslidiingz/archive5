-- CreateTable
CREATE TABLE "promotions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organize_uid" TEXT NOT NULL,
    "event_uid" TEXT NOT NULL,
    "promotion_code" TEXT NOT NULL,
    "discount_type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "limit" INTEGER,
    "amount" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "start_at" TIMESTAMP(3) NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "promotion_history" (
    "id" SERIAL NOT NULL,
    "promotion_id" INTEGER NOT NULL,
    "user_uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotion_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "promotions_id_key" ON "promotions"("id");

-- AddForeignKey
ALTER TABLE "promotion_history" ADD CONSTRAINT "promotion_history_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
