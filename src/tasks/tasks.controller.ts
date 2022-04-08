import { Controller, Get, Param } from '@nestjs/common';
import { WeatherServiceService } from './shared/weather-service/weather-service.service';
import { CountyServiceService } from './shared/county-service/county-service.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private weatherService: WeatherServiceService,
    private countyService: CountyServiceService,
  ) {}

  @Get(':nome')
  async getByCounty(@Param('nome') name: string) {
    const [countyData] = await this.countyService.getCountyByName(name);
    const forecastData = await this.weatherService.getForecast(
      countyData.latitude,
      countyData.longitude,
    );
    console.log('forecastData.current', forecastData.current);
    return forecastData.current.weather;
  }
}
