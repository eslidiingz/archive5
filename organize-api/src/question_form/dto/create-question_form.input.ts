import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateQuestionFormInput {
  @Field(() => String)
  form_uid: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  input_type_slug: string;

  @Field(() => String, { defaultValue: null })
  choice_list: string;

  @Field(() => Date, { defaultValue: new Date() })
  created_at: Date;
}
