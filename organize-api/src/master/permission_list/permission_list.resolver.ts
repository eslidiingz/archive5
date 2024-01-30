import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionListService } from './permission_list.service';
import { PermissionList } from './entities/permission_list.entity';
import { CreatePermissionListInput } from './dto/create-permission_list.input';
import { UpdatePermissionListInput } from './dto/update-permission_list.input';

@Resolver(() => PermissionList)
export class PermissionListResolver {
  constructor(private readonly permissionListService: PermissionListService) {}

  @Mutation(() => PermissionList)
  createPermissionList(@Args('createPermissionListInput') createPermissionListInput: CreatePermissionListInput) {
    return this.permissionListService.create(createPermissionListInput);
  }

  @Query(() => [PermissionList], { name: 'permissionList' })
  findAll() {
    return this.permissionListService.findAll();
  }

  @Query(() => PermissionList, { name: 'permissionList' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.permissionListService.findOne(id);
  }

  @Mutation(() => PermissionList)
  updatePermissionList(@Args('updatePermissionListInput') updatePermissionListInput: UpdatePermissionListInput) {
    return this.permissionListService.update(updatePermissionListInput.id, updatePermissionListInput);
  }

  @Mutation(() => PermissionList)
  removePermissionList(@Args('id', { type: () => Int }) id: number) {
    return this.permissionListService.remove(id);
  }
}
