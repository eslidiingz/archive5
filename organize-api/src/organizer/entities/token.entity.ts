import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Token {
  @Field(() => String, {
    nullable: true,
    description: "Organizer cms_access_token",
  })
  cms_access_token: string;
}
