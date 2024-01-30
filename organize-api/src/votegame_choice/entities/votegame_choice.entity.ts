import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Answer } from "src/answer/entities/answer.entity";
import { QuestionForm } from "src/question_form/entities/question_form.entity";
import { VoteGameQuestion } from "src/votegame_question/entities/votegamequestion.entity";

@ObjectType()
export class VoteGameChoice {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  uid: string;

  @Field(() => String)
  event_uid: string;

  @Field(() => String, { nullable: true })
  choices: string;

  @Field(() => Boolean)
  is_active: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => [VoteGameQuestion], { nullable: true })
  questions: VoteGameQuestion[];

}
