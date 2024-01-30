import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { RegisterForm } from "src/register_form/entities/register_form.entity";
import { TicketUser } from "src/ticket_user/entities/ticket_user.entity";

@ObjectType()
export class Ticket {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  registerform_uid: string;

  @Field(() => String)
  uuid: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  image_url: string;

  @Field(() => Float)
  price: number;

  @Field(() => String, { description: "limit, unlimit" })
  limit_type: string;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  amount: number;

  @Field(() => Boolean)
  discount_option: boolean;

  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  @Field(() => [TicketUser], { nullable: true })
  ticket_user: TicketUser[];
}
