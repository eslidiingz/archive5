import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Answer } from "src/answer/entities/answer.entity";
import { QuestionForm } from "src/question_form/entities/question_form.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";

@ObjectType()
export class RegisterForm {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  uuid: string;

  @Field(() => String)
  event_uid: string;

  @Field(() => String)
  topic: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  require: boolean;

  @Field(() => Boolean)
  is_active: boolean;

  @Field(() => Date, { nullable: true })
  start_date: Date;

  @Field(() => Date, { nullable: true })
  end_date: Date;

  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  @Field(() => String, { nullable: null })
  form_type: string;

  @Field(() => [QuestionForm], { nullable: true })
  questions: QuestionForm[];

  @Field(() => [Answer], { nullable: true })
  answer: Answer[];

  @Field(() => [Ticket], { nullable: true })
  ticket: Ticket[];
}
