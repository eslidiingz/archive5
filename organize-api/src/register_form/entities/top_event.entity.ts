import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class TopEvent {
  @Field(() => String)
  event_name: string;

  @Field(() => Int)
  amount: number;
}
