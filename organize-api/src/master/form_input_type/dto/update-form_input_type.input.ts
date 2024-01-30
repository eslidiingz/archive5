import { CreateFormInputTypeInput } from './create-form_input_type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFormInputTypeInput extends PartialType(CreateFormInputTypeInput) {
  @Field(() => Int)
  id: number;
}
