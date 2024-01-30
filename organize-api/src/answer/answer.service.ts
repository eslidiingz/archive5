import { Injectable } from "@nestjs/common";
import { CreateAnswerInput } from "./dto/create-answer.input";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAnswerInput: CreateAnswerInput) {
    const input = { ...createAnswerInput };

    const _result = await this.prisma.answer.create({
      data: input,
    });

    return _result;
  }

  async createList(createAnswerInput: CreateAnswerInput[]) {
    let created_time = { created_at: new Date() };

    for (let i = 0; i < createAnswerInput.length; i++) {
      Object.assign(createAnswerInput[i], created_time);
    }
    const _result = await this.prisma.answer.createMany({
      data: createAnswerInput,
    });

    return _result.count;
  }

  async findAll(form_uid: string) {
    return await this.prisma.answer.findMany({
      where: {
        form_uid: form_uid,
      },
      include: {
        RegisterForm: true,
        QuestionForm: true,
      },
    });
  }

  async findAllByQuestionUid(question_uid: string) {
    return await this.prisma.answer.findMany({
      where: {
        question_uid: question_uid,
      },
      include: {
        RegisterForm: true,
        QuestionForm: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.answer.delete({
      where: {
        id: id,
      },
    });
  }
}
