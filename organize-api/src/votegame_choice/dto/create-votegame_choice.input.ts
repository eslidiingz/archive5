import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateVoteGameChoiceInput {

  @Field(() => String)
  event_uid: string;

  @Field(() => String)
  choices: string;

  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

  @Field(() => Date, { defaultValue: new Date() })
  created_at: Date;

}
