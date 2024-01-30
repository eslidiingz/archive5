-- CreateTable
CREATE TABLE "form_input_type" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desciption" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "form_input_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "register_form" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "event_uid" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "require" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "register_form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionForm" (
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

    CONSTRAINT "QuestionForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" SERIAL NOT NULL,
    "user_uid" TEXT NOT NULL,
    "question_uid" TEXT NOT NULL,
    "form_uid" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "form_input_type_slug_key" ON "form_input_type"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "form_input_type_name_key" ON "form_input_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "register_form_uuid_key" ON "register_form"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionForm_uuid_key" ON "QuestionForm"("uuid");

-- AddForeignKey
ALTER TABLE "QuestionForm" ADD CONSTRAINT "QuestionForm_form_uid_fkey" FOREIGN KEY ("form_uid") REFERENCES "register_form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_form_uid_fkey" FOREIGN KEY ("form_uid") REFERENCES "register_form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_question_uid_fkey" FOREIGN KEY ("question_uid") REFERENCES "QuestionForm"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
