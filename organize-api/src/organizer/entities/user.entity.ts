import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class UserOrganizer {
  @Field(() => String, { description: "Organizer verse_uid" })
  verse_uid: string;

  @Field(() => String, { description: "Organizer uuid" })
  uuid: string;

  @Field(() => String, { description: "organize_uid", nullable: true })
  organize_uid: string;

  @Field(() => String, { description: "Organizer name" })
  name: string;

  @Field(() => String, { description: "Organizer lastname" })
  lastname: string;

  @Field(() => String, { description: "Organizer phone_number" })
  phone_number: string;

  @Field(() => String, { description: "Organizer email" })
  email: string;

  @Field(() => String, { description: "Organizer city" })
  city: string;

  @Field(() => String, { description: "Organizer country" })
  country: string;

  @Field(() => String, { description: "Organizer organization_address" })
  organization_address: string;

  @Field(() => String, { description: "Organizer organization_name" })
  organization_name: string;

  @Field(() => String, {
    nullable: true,
    description: "Organizer cms_access_token",
  })
  cms_access_token: string;

  @Field(() => Boolean)
  is_active: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => String, { nullable: true })
  package_uid: string;
}
