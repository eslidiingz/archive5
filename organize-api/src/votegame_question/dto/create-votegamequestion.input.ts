import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateVoteGameQuestionInput {

  @Field(() => String)
  event_uid: string;

  @Field(() => String)
  vote_game_uid: string;

  @Field(() => String)
  question: string;

  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

  @Field(() => Date, { defaultValue: new Date() })
  created_at: Date;
  
}
