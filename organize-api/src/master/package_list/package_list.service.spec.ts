import { Test, TestingModule } from '@nestjs/testing';
import { PackageListService } from './package_list.service';

describe('PackageListService', () => {
  let service: PackageListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageListService],
    }).compile();

    service = module.get<PackageListService>(PackageListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
