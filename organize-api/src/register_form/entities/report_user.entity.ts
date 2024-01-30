import { ObjectType, Field } from "@nestjs/graphql";
import { Answer } from "src/answer/entities/answer.entity";

@ObjectType()
export class ReportUser {
  @Field(() => String)
  header: string;

  @Field(() => [Answer])
  data: Answer[];
}
