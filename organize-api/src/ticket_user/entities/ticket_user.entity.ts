import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { RegisterForm } from "src/register_form/entities/register_form.entity";
import { UseTicket } from "src/use_ticket/entities/use_ticket.entity";

@ObjectType()
export class TicketUser {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  ticket_uid: string;

  @Field(() => Int)
  ticket_no: number;

  @Field(() => String)
  user_uid: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  total: number;

  @Field(() => String, { description: "payment_type" })
  payment_type: string;

  @Field(() => String, { description: "payment_status" })
  payment_status: string;

  @Field(() => String)
  use_status: string;

  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  @Field(() => [UseTicket], { nullable: true })
  use_tickets: UseTicket[];

}
