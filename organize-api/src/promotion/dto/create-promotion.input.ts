import { InputType, Int, Field, Float } from "@nestjs/graphql";

@InputType()
export class CreatePromotionInput {
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

  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

  @Field(() => Date)
  start_at: Date;

  @Field(() => Date)
  expired_at: Date;

}
