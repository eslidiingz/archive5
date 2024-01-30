import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Answer } from "src/answer/entities/answer.entity";

@ObjectType()
export class QuestionForm {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  uuid: string;

  @Field(() => String)
  form_uid: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  input_type_slug: string;

  @Field(() => String, { nullable: true })
  choice_list: string;

  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  @Field(() => [Answer], { nullable: true })
  answer: Answer[];
}
