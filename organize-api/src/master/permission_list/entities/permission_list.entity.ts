import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class PermissionList {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  is_active: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;
}
