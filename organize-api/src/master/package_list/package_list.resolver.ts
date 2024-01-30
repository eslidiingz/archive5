import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PackageListService } from './package_list.service';
import { PackageList } from './entities/package_list.entity';
import { CreatePackageListInput } from './dto/create-package_list.input';
import { UpdatePackageListInput } from './dto/update-package_list.input';

@Resolver(() => PackageList)
export class PackageListResolver {
  constructor(private readonly packageListService: PackageListService) {}

  @Mutation(() => PackageList)
  createPackageList(@Args('createPackageListInput') createPackageListInput: CreatePackageListInput) {
    return this.packageListService.create(createPackageListInput);
  }

  @Query(() => [PackageList], { name: 'packageList' })
  findAll() {
    return this.packageListService.findAll();
  }

  @Query(() => PackageList, { name: 'packageList' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.packageListService.findOne(id);
  }

  @Mutation(() => PackageList)
  updatePackageList(@Args('updatePackageListInput') updatePackageListInput: UpdatePackageListInput) {
    return this.packageListService.update(updatePackageListInput.id, updatePackageListInput);
  }

  @Mutation(() => PackageList)
  removePackageList(@Args('id', { type: () => Int }) id: number) {
    return this.packageListService.remove(id);
  }
}
