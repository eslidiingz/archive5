import { Module } from "@nestjs/common";
import { QuestionFormService } from "./question_form.service";
import { QuestionFormResolver } from "./question_form.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [QuestionFormResolver, QuestionFormService, PrismaService],
})
export class QuestionFormModule {}
