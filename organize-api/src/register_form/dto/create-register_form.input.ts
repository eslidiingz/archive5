import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateRegisterFormInput {
  @Field(() => String)
  event_uid: string;

  @Field(() => String)
  topic: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  require: boolean;

  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

  @Field(() => Date, { defaultValue: null })
  start_date: Date;

  @Field(() => Date, { defaultValue: null })
  end_date: Date;

  @Field(() => Date, { defaultValue: new Date() })
  created_at: Date;

  @Field(() => String)
  form_type: string;
}
