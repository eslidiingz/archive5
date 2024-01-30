-- CreateTable
CREATE TABLE "vote_game_question" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "event_uid" TEXT,
    "vote_game_uid" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "vote_game_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote_game" (
    "uid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "event_uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "choices_uid" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "vote_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote_game_choices" (
    "id" SERIAL NOT NULL,
    "event_uid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "choices" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "vote_game_choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote_game_result" (
    "id" SERIAL NOT NULL,
    "event_uid" TEXT,
    "vote_game_uid" TEXT,
    "question_uid" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vote_game_result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vote_game_question_uid_key" ON "vote_game_question"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "vote_game_uid_key" ON "vote_game"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "vote_game_choices_uid_key" ON "vote_game_choices"("uid");

-- AddForeignKey
ALTER TABLE "vote_game_question" ADD CONSTRAINT "vote_game_question_vote_game_uid_fkey" FOREIGN KEY ("vote_game_uid") REFERENCES "vote_game"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
