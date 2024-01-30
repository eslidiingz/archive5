import { ObjectType, Field, Int } from "@nestjs/graphql";
import { TicketUser } from "src/ticket_user/entities/ticket_user.entity";

@ObjectType()
export class UseTicket {

  @Field(() => Int)
  id: number;

  @Field(() => Int)
  ticket_user_id: number;

  @Field(() => Int)
  ticket_no: number;

  @Field(() => Date)
  created_at: Date;

}
