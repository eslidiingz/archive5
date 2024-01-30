import { CreateQuestionFormInput } from "./create-question_form.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateQuestionFormInput extends PartialType(
  CreateQuestionFormInput
) {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { defaultValue: new Date() })
  updated_at: Date;
}
