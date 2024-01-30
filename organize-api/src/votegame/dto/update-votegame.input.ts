import {CreateVoteGameInput } from "./create-votegame.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateVoteGameInput extends PartialType(
    CreateVoteGameInput
) {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { defaultValue: new Date() })
  updated_at: Date;
}
