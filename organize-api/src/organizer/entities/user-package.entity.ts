import { ObjectType, Field } from "@nestjs/graphql";
import { Package } from "src/master/package/entities/package.entity";

@ObjectType()
export class UserPackageOrganizer {
  @Field(() => Package, { nullable: true })
  package: Package;
}
