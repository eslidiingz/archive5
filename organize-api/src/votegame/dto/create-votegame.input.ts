import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateVoteGameInput {

  @Field(() => String)
  event_uid: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

  @Field(() => Date, { defaultValue: new Date() })
  created_at: Date;

  @Field(() => String)
  choices_uid: string;

}
