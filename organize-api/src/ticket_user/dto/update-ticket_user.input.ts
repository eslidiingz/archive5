import { CreateTicketUserInput } from './create-ticket_user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTicketUserInput extends PartialType(CreateTicketUserInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  payment_status?: string;
}
