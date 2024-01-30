import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class ReportRegisterWeek {
  @Field(() => String)
  day: string;

  @Field(() => Int)
  count: number;
}
