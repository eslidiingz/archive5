import { ObjectType, Field, Int } from "@nestjs/graphql";
import { QuestionForm } from "src/question_form/entities/question_form.entity";
import { RegisterForm } from "src/register_form/entities/register_form.entity";

@ObjectType()
export class Answer {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  user_uid: string;

  @Field(() => String)
  question_uid: string;

  @Field(() => String)
  form_uid: string;

  @Field(() => String)
  result: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  @Field(() => RegisterForm, { nullable: true })
  RegisterForm: RegisterForm;

  @Field(() => QuestionForm, { nullable: true })
  QuestionForm: QuestionForm;
}
