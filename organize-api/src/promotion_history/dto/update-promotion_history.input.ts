import { CreatePromotionHistoryInput } from './create-promotion_history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePromotionHistoryInput extends PartialType(CreatePromotionHistoryInput) {
  @Field(() => Int)
  id: number;
}
