/*
  Warnings:

  - You are about to drop the `QuestionForm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionForm" DROP CONSTRAINT "QuestionForm_form_uid_fkey";

-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_question_uid_fkey";

-- DropTable
DROP TABLE "QuestionForm";

-- CreateTable
CREATE TABLE "question_form" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "form_uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "input_type_slug" TEXT NOT NULL,
    "choice_list" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "question_form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "question_form_uuid_key" ON "question_form"("uuid");

-- AddForeignKey
ALTER TABLE "question_form" ADD CONSTRAINT "question_form_form_uid_fkey" FOREIGN KEY ("form_uid") REFERENCES "register_form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_question_uid_fkey" FOREIGN KEY ("question_uid") REFERENCES "question_form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
