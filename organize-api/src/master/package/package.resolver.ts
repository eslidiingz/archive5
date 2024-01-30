import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PackageService } from "./package.service";
import { Package } from "./entities/package.entity";
import { CreatePackageInput } from "./dto/create-package.input";
import { UpdatePackageInput } from "./dto/update-package.input";

@Resolver(() => Package)
export class PackageResolver {
  constructor(private readonly packageService: PackageService) {}

  @Mutation(() => Package)
  createPackage(
    @Args("createPackageInput") createPackageInput: CreatePackageInput
  ) {
    return this.packageService.create(createPackageInput);
  }

  @Query(() => [Package], { name: "packages" })
  findAll() {
    return this.packageService.findAll();
  }

  @Query(() => Package, { name: "packageByUid" })
  findOne(@Args("uid", { type: () => String }) uid: string) {
    return this.packageService.findOne(uid);
  }

  @Mutation(() => Package)
  updatePackage(
    @Args("updatePackageInput") updatePackageInput: UpdatePackageInput
  ) {
    return this.packageService.update(
      updatePackageInput.id,
      updatePackageInput
    );
  }

  @Mutation(() => Package)
  removePackage(@Args("id", { type: () => Int }) id: number) {
    return this.packageService.remove(id);
  }
}
