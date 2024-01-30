import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'Example field username' })
  username: string;

  @Field(() => String, { description: 'Example field password' })
  password: string;
}
