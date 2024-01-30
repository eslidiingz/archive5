import { Module } from "@nestjs/common";
import { FormInputTypeService } from "./form_input_type.service";
import { FormInputTypeResolver } from "./form_input_type.resolver";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [FormInputTypeResolver, FormInputTypeService, PrismaService],
})
export class FormInputTypeModule {}
