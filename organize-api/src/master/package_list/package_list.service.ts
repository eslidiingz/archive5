import { Injectable } from '@nestjs/common';
import { CreatePackageListInput } from './dto/create-package_list.input';
import { UpdatePackageListInput } from './dto/update-package_list.input';

@Injectable()
export class PackageListService {
  create(createPackageListInput: CreatePackageListInput) {
    return 'This action adds a new packageList';
  }

  findAll() {
    return `This action returns all packageList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} packageList`;
  }

  update(id: number, updatePackageListInput: UpdatePackageListInput) {
    return `This action updates a #${id} packageList`;
  }

  remove(id: number) {
    return `This action removes a #${id} packageList`;
  }
}
