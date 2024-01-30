import { CreateVoteGameQuestionInput } from "./create-votegamequestion.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateVoteGameQuestionInput extends PartialType(
  CreateVoteGameQuestionInput
) {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { defaultValue: new Date() })
  updated_at: Date;
}
