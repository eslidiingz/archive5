import { CreateUseTicketInput } from './create-use_ticket.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUseTicketInput extends PartialType(CreateUseTicketInput) {
  @Field(() => Int)
  id: number;
}
