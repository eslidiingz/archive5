-- CreateEnum
CREATE TYPE "EConnectionActivityStatus" AS ENUM ('CONNECTED', 'DISCONNECTED', 'KICKED', 'BANNED');

-- CreateTable
CREATE TABLE "organizer" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "organization_address" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connection_activity" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "logged_by" TEXT,
    "note" TEXT,
    "status" "EConnectionActivityStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "connection_activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizer_uuid_key" ON "organizer"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "organizer_phone_number_key" ON "organizer"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "organizer_email_key" ON "organizer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizer_username_key" ON "organizer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "organizer_password_key" ON "organizer"("password");

-- AddForeignKey
ALTER TABLE "connection_activity" ADD CONSTRAINT "connection_activity_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "organizer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
