import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FormInputTypeService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.formInputType.findMany({
      where: {
        deleted_at: null,
      },
    });
  }
}
