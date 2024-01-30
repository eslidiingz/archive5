import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { LoginInput } from './create-auth.input';

@InputType()
export class UpdateAuthInput extends PartialType(LoginInput) {
  @Field(() => Int)
  id: number;
}
