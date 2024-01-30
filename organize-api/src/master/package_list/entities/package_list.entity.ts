import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Package } from "src/master/package/entities/package.entity";
import { PermissionList } from "src/master/permission_list/entities/permission_list.entity";

@ObjectType()
export class PackageList {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  package_uid: string;

  @Field(() => String)
  permission_slug: string;

  @Field(() => String)
  limit_slug: string;

  @Field(() => Int)
  limit: number;

  @Field(() => String, { nullable: true })
  unit: string;

  @Field(() => Boolean)
  is_active: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  @Field(() => [Package], { nullable: true })
  masterPackage: Package[];

  @Field(() => PermissionList, { nullable: true })
  masterPermissionList: PermissionList;
}
