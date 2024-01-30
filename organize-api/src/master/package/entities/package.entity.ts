import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { PackageList } from "src/master/package_list/entities/package_list.entity";

@ObjectType()
export class Package {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  uuid: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  image_url: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  discount: number;

  @Field(() => Int, { nullable: true })
  periods: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date;

  @Field(() => [PackageList], { nullable: true })
  packageList: PackageList[];
}
