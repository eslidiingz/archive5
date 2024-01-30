import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class VoteGameQuestion {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  uid: string;

  @Field(() => String)
  event_uid: string;

  @Field(() => String)
  vote_game_uid: string;

  @Field(() => String)
  question: string;

  @Field(() => Boolean)
  is_active: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
