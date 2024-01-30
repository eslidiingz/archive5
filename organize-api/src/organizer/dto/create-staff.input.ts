import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateStaffInput {
  @Field(() => String, { description: "staff name" })
  name: string;

  @Field(() => String, { description: "staff lastname" })
  lastname: string;

  @Field(() => String, { description: "staff phone_number" })
  phone_number: string;

  @Field(() => String, { description: "staff email" })
  email: string;

  @Field(() => String, { description: "staff username" })
  username: string;

  @Field(() => String, { description: "staff password" })
  password: string;

  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

  @Field(() => Date, { defaultValue: new Date() })
  created_at: Date;

  @Field(() => String)
  role: string;
}
