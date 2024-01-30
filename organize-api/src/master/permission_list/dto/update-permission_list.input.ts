import { CreatePermissionListInput } from './create-permission_list.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionListInput extends PartialType(CreatePermissionListInput) {
  @Field(() => Int)
  id: number;
}
