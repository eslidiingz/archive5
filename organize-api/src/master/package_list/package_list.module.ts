import { Module } from '@nestjs/common';
import { PackageListService } from './package_list.service';
import { PackageListResolver } from './package_list.resolver';

@Module({
  providers: [PackageListResolver, PackageListService]
})
export class PackageListModule {}
