import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromotionHistoryInput {

  @Field(() => Int, { description: 'Enter promotion Id' })
  promotion_id: number;

  @Field(() => String, { description: 'Enter user Id' })
  user_uid: string;
}
