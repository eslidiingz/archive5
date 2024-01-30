import { CreateOrganizerInput } from './create-organizer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizerInput extends PartialType(CreateOrganizerInput) {
  @Field(() => String, { description: "Organizer uuid" })
  uuid: string;

  @Field(() => Date, { defaultValue : new Date() })
  updated_at: Date;
}
