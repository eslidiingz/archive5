import { Module } from "@nestjs/common";
import { PackageService } from "./package.service";
import { PackageResolver } from "./package.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [PackageResolver, PackageService, PrismaService],
})
export class PackageModule {}
