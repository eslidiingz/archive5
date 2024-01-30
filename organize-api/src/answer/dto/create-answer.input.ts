import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateAnswerInput {
  @Field(() => String)
  user_uid: string;

  @Field(() => String)
  question_uid: string;

  @Field(() => String)
  form_uid: string;

  @Field(() => String)
  result: string;
}
