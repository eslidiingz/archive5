import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFormInputTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
