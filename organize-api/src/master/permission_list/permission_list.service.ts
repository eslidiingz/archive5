import { Injectable } from '@nestjs/common';
import { CreatePermissionListInput } from './dto/create-permission_list.input';
import { UpdatePermissionListInput } from './dto/update-permission_list.input';

@Injectable()
export class PermissionListService {
  create(createPermissionListInput: CreatePermissionListInput) {
    return 'This action adds a new permissionList';
  }

  findAll() {
    return `This action returns all permissionList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionList`;
  }

  update(id: number, updatePermissionListInput: UpdatePermissionListInput) {
    return `This action updates a #${id} permissionList`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionList`;
  }
}
