import { Test, TestingModule } from '@nestjs/testing';
import { CountyServiceService } from './county-service.service';

describe('CountyServiceService', () => {
  let service: CountyServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountyServiceService],
    }).compile();

    service = module.get<CountyServiceService>(CountyServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
