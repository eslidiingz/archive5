-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_registerform_uid_fkey" FOREIGN KEY ("registerform_uid") REFERENCES "register_form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
