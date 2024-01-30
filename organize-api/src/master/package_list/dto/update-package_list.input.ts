import { CreatePackageListInput } from './create-package_list.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePackageListInput extends PartialType(CreatePackageListInput) {
  @Field(() => Int)
  id: number;
}
