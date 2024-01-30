import { Resolver, Query } from "@nestjs/graphql";
import { FormInputTypeService } from "./form_input_type.service";
import { FormInputType } from "./entities/form_input_type.entity";

@Resolver(() => FormInputType)
export class FormInputTypeResolver {
  constructor(private readonly formInputTypeService: FormInputTypeService) {}

  @Query(() => [FormInputType], { name: "formInputTypeAll" })
  findAll() {
    return this.formInputTypeService.findAll();
  }
}
