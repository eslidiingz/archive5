import {CreateVoteGameChoiceInput } from "./create-votegame_choice.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateVoteGameChoiceInput extends PartialType(
  CreateVoteGameChoiceInput
) {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { defaultValue: new Date() })
  updated_at: Date;
}
