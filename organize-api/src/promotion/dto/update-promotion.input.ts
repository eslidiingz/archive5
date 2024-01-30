import { CreatePromotionInput } from "./create-promotion.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdatePromotionInput extends PartialType(CreatePromotionInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { defaultValue: new Date() })
  updated_at: Date;
}
