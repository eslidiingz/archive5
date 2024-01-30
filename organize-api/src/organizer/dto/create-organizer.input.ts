import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateOrganizerInput {
  @Field(() => String, { description: "Organizer verse_uid" })
  verse_uid: string;

  @Field(() => String, { description: "Organizer name" })
  name: string;

  @Field(() => String, { description: "Organizer lastname" })
  lastname: string;

  @Field(() => String, { description: "Organizer phone_number" })
  phone_number: string;

  @Field(() => String, { description: "Organizer email" })
  email: string;

  @Field(() => String, { description: "Organizer username" })
  username: string;

  @Field(() => String, { description: "Organizer password" })
  password: string;

  @Field(() => String, { description: "Organizer city" })
  city: string;

  @Field(() => String, { description: "Organizer country" })
  country: string;

  @Field(() => String, { description: "Organizer organization_address" })
  organization_address: string;

  @Field(() => String, { description: "Organizer organization_name" })
  organization_name: string;

  @Field(() => String, {
    defaultValue: "",
    description: "Organizer cms_access_token",
  })
  cms_access_token: string;

  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

  @Field(() => Date, { defaultValue: new Date() })
  created_at: Date;

  @Field(() => String)
  package_uid: string;

  @Field(() => String, { defaultValue: "owner" })
  role: string;
}
