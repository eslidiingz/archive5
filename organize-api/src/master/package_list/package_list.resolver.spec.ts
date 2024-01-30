import { Test, TestingModule } from '@nestjs/testing';
import { PackageListResolver } from './package_list.resolver';
import { PackageListService } from './package_list.service';

describe('PackageListResolver', () => {
  let resolver: PackageListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageListResolver, PackageListService],
    }).compile();

    resolver = module.get<PackageListResolver>(PackageListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
