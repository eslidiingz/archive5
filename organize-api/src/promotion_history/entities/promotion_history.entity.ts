import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class PromotionHistory {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  promotion_id: number;

  @Field(() => String)
  user_uid: string;

  @Field(() => Date)
  created_at: Date;
}
