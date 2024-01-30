import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTicketUserInput {
  
  @Field(() => String)
  ticket_uid: string;

  @Field(() => String)
  user_uid: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => String, { description: "payment_type" })
  payment_type: string;

}
