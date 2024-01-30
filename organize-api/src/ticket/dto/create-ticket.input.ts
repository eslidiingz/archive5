import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  
  @Field(() => String)
  name: string;

  @Field(() => String)
  registerform_uid: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  image_url: string;

  @Field(() => Float)
  price: number;

  @Field(() => String, { description: "limit something" })
  limit_type: string;

  @Field(() => Int, { description: "0 = unlimit, >0 = limit" })
  limit: number;

  @Field(() => Boolean, { nullable: true })
  discount_option: boolean;

  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

}
