import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class FormInputType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  desciption: string;

  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;
}
