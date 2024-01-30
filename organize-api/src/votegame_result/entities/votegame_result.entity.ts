import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Answer } from "src/answer/entities/answer.entity";
import { QuestionForm } from "src/question_form/entities/question_form.entity";
import { VoteGameQuestion } from "src/votegame_question/entities/votegamequestion.entity";

@ObjectType()
export class VoteGameResult {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  event_uid: string;

  @Field(() => String, { nullable: true })
  vote_game_uid: string;

  @Field(() => String)
  result: string;

  @Field(() => String)
  question_uid: string;

  @Field(() => Date)
  created_at: Date;

}
