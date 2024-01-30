import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateVoteGameResultInput } from "./create-votegame_result.input";
@InputType()
export class UpdateVoteGameResultInput extends PartialType(
  CreateVoteGameResultInput
) {
  @Field(() => Int)
  id: number;
  
}
