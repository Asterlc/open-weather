import { Test, TestingModule } from '@nestjs/testing';
import { WeatherServiceService } from './weather-service.service';

describe('WeatherServiceService', () => {
  let service: WeatherServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherServiceService],
    }).compile();

    service = module.get<WeatherServiceService>(WeatherServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
