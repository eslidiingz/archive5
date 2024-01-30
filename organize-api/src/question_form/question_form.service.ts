import { Injectable } from "@nestjs/common";
import { CreateQuestionFormInput } from "./dto/create-question_form.input";
import { UpdateQuestionFormInput } from "./dto/update-question_form.input";
import { PrismaService } from "src/prisma/prisma.service";
import { uuid } from "uuidv4";

@Injectable()
export class QuestionFormService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionFormInput: CreateQuestionFormInput) {
    const input = { ...createQuestionFormInput, uuid: uuid() };

    const _result = await this.prisma.questionForm.create({
      data: input,
    });
    return _result;
  }

  async createList(createQuestionFormListInput: CreateQuestionFormInput[]) {
    const inputList = await Promise.all(
      createQuestionFormListInput.map(async (param: any) => {
        return {
          ...param,
          uuid: uuid(),
        };
      })
    );

    const _resultCreateMany = await this.prisma.questionForm.createMany({
      data: inputList,
    });

    return _resultCreateMany.count;
  }

  async findAll(form_uid: string) {
    return await this.prisma.questionForm.findMany({
      where: {
        form_uid: form_uid,
      },
      include: {
        answer: true,
      },
    });
  }

  async findOne(uid: string) {
    return await this.prisma.questionForm.findFirst({
      where: {
        uuid: uid,
      },
    });
  }

  async update(id: number, updateQuestionFormInput: UpdateQuestionFormInput) {
    const input = { ...updateQuestionFormInput };
    const _result = await this.prisma.questionForm.update({
      where: {
        id: id,
      },
      data: input,
    });
    return _result;
  }

  async remove(id: number) {

    const questionForm = await this.prisma.questionForm.findUnique({
      where: {
        id: id,
      },
      include: {
        answer:true
      },
    });

    if (!questionForm) {
      throw new Error('Register form not found.');
    }
    if (questionForm.answer.length > 0) {
      await this.prisma.answer.deleteMany({
        where: {
          form_uid: questionForm.form_uid,
        },
      });
    }
  
    return await this.prisma.questionForm.delete({
      where: {
        id: id,
      },
    });
  }
  
}
