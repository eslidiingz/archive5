import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { PromotionHistory } from "src/promotion_history/entities/promotion_history.entity";

@ObjectType()
export class Promotion {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  organize_uid: string;

  @Field(() => String)
  event_uid: string;

  @Field(() => String)
  promotion_code: string;

  @Field(() => String, { description: "percent or currency" })
  discount_type: string;

  @Field(() => Float)
  value: number;

  @Field(() => Int, { description: "0 = unlimit, >0 = limit" })
  limit: number;

  @Field(() => Int, { description: "fix limit" })
  amount: number;

  @Field(() => Boolean)
  is_active: boolean;

  @Field(() => Date)
  start_at: Date;

  @Field(() => Date)
  expired_at: Date;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  @Field(() => [PromotionHistory], { nullable: true })
  history: PromotionHistory[];
}
