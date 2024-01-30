import { ObjectType, Field, Int, Float } from "@nestjs/graphql";

@ObjectType()
export class SummaryEvent {
  @Field(() => Int)
  total_register: number;

  @Field(() => Int)
  total_ticket: number;

  @Field(() => Int)
  total_view: number;

  @Field(() => Float)
  total_revenue: number;
}
