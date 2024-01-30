import { Injectable } from "@nestjs/common";
import { CreatePackageInput } from "./dto/create-package.input";
import { UpdatePackageInput } from "./dto/update-package.input";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PackageService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPackageInput: CreatePackageInput) {
    return "This action adds a new package";
  }

  async findAll() {
    return await this.prisma.masterPackage.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        packageList: true,
      },
    });
  }

  async findOne(uid: string) {
    return await this.prisma.masterPackage.findFirst({
      where: {
        uuid: uid,
        deleted_at: null,
      },
      include: {
        packageList: true,
      },
    });
  }

  update(id: number, updatePackageInput: UpdatePackageInput) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
