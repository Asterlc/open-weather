import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountyServiceService } from '../county-service/county-service.service';
import { CountyModule } from '../county-service/county.module';
import { WeatherServiceService } from './weather-service.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherServiceService, CountyServiceService],
})
export class WeatherModule {}
