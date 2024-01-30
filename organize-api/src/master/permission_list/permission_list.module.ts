import { Module } from '@nestjs/common';
import { PermissionListService } from './permission_list.service';
import { PermissionListResolver } from './permission_list.resolver';

@Module({
  providers: [PermissionListResolver, PermissionListService]
})
export class PermissionListModule {}
