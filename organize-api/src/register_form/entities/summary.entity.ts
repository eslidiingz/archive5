import { ObjectType, Field, Int, Float } from "@nestjs/graphql";

@ObjectType()
export class SummaryRegister {
  @Field(() => Int)
  total_register: number;

  @Field(() => Int)
  total_ticket: number;

  @Field(() => Int)
  total_event: number;

  @Field(() => Float)
  total_revenue: number;

  @Field(() => Float)
  average_event: number;

  @Field(() => Float)
  average_register: number;

  @Field(() => Float)
  average_revenue: number;

  @Field(() => Float)
  average_ticket: number;
}
