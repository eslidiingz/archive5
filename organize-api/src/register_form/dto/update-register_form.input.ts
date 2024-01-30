import { CreateRegisterFormInput } from "./create-register_form.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateRegisterFormInput extends PartialType(
  CreateRegisterFormInput
) {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { defaultValue: new Date() })
  updated_at: Date;
}
