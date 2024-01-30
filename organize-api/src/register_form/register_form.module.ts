import { Module } from "@nestjs/common";
import { RegisterFormService } from "./register_form.service";
import { RegisterFormResolver } from "./register_form.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [RegisterFormResolver, RegisterFormService, PrismaService],
})
export class RegisterFormModule {}
