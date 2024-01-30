import { Injectable } from "@nestjs/common";
import { CreatePromotionInput } from "./dto/create-promotion.input";
import { UpdatePromotionInput } from "./dto/update-promotion.input";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPromotionInput: CreatePromotionInput) {
    const input = {
      ...createPromotionInput,
      amount: createPromotionInput.limit,
    };

    const _result = await this.prisma.promotion.create({
      data: input,
      include: {
        history: true,
      },
    });
    return _result;
  }
  async findAll() {
    return await this.prisma.promotion.findMany({ include: { history: true } });
  }

  async findPromotionById(id: number) {
    return await this.prisma.promotion.findUnique({
      where: { id: id },
      include: { history: true },
    });
  }

  async findPromotionByEventUid(event_uid: string) {
    return await this.prisma.promotion.findMany({
      where: { event_uid: event_uid },
      include: { history: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.promotion.findFirst({
      where: {
        id: id,
      },
      include: {
        history: true,
      },
    });
  }

  async update(id: number, updatePromotionInput: UpdatePromotionInput) {
    const input = { ...updatePromotionInput };
    return await this.prisma.promotion.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: number) {
    return await this.prisma.promotion.delete({
      where: {
        id: id,
      },
    });
  }
}
