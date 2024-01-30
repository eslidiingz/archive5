import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUseTicketInput {

  @Field(() => Int, { description: 'Enter promotion Id' })
  ticket_no: number;
  
}
