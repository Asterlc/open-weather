import { Controller, Get, Param } from '@nestjs/common';
import { WeatherServiceService } from './shared/weather-service/weather-service.service';
import { CountyServiceService } from './shared/county-service/county-service.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  currentWeatherHelper,
  currentSummaryHelper,
} from './shared/helpers/summary.helper';

@Controller('forecast')
export class TasksController {
  constructor(
    private weatherService: WeatherServiceService,
    private countyService: CountyServiceService,
  ) { }
  @ApiTags('Forecast')
  @ApiOperation(currentSummaryHelper)
  @ApiParam(currentWeatherHelper)
  @Get(':nome')
  async getByCounty(@Param('nome') name: string) {
    const [countyData] = await this.countyService.getCountyByName(name);
    const forecastData = await this.weatherService.getForecast(
      countyData?.latitude,
      countyData?.longitude,
    );

    return {
      weather: forecastData?.current?.weather,
      temperatureCelsius: forecastData?.current?.temp,
      windSpeed: forecastData?.current?.wind_speed,
      feelsLikeCelsius: forecastData?.current?.feels_like,
      humidity: forecastData?.current?.humidity,
      dewPoint: forecastData?.current?.dew_point,
      wind_direction: forecastData?.current?.wind_deg,
      maxUVI: forecastData?.current?.uvi,
      clouds: forecastData?.current?.clouds,
    };
  }

  //Paid subscription not a free service
  // @ApiOperation(historicalSummary)
  // @ApiParam(historicalWeatherHelper)
  // @Get(':nome/:data')
  // async getCountyHistorical(@Param('nome') name: string, @Param('data') timestamp: string) {
  //   const [countyData] = await this.countyService.getCountyByName(name);
  //   const historicalWeather = await this.weatherService.getHistoricalWeather(
  //     countyData?.latitude,
  //     countyData?.longitude,
  //     timestamp
  //   )
  //   return historicalWeather;
  // }
}