import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateVoteGameResultInput {

  @Field(() => String)
  event_uid: string;

  @Field(() => String)
  vote_game_uid: string;

  @Field(() => String)
  question_uid: string;

  @Field(() => String)
  result: string;

  @Field(() => Date, { defaultValue: new Date() })
  created_at: Date;

}
