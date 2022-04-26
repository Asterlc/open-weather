import { Controller, Get, Param } from '@nestjs/common';
import { WeatherServiceService } from './shared/weather-service/weather-service.service';
import { CountyServiceService } from './shared/county-service/county-service.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('forecast')
export class TasksController {
  constructor(
    private weatherService: WeatherServiceService,
    private countyService: CountyServiceService,
  ) {}
  @ApiTags('Forecast')
  @ApiOperation({ summary: 'Pesquisar clima-tempo de um município brasileiro' })
  @ApiParam({
    name: 'nome',
    description: 'Nome do município deve respeitar caracteres maiúsculos e minúsculos',
    allowEmptyValue: false,
    examples: {
      a: {
        summary: 'São Paulo',
        description: 'Clima e tempo do município de São Paulo',
        value: 'São Paulo',
      },
      b: {
        summary: 'Vitória',
        description: 'Clima e tempo do município de Vitória',
        value: 'Vitória',
      },
      c: {
        summary: 'São José dos Campos',
        description: 'Clima e tempo do município de São José dos Campos',
        value: 'São José dos Campos',
      },
    },
  })
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
    };
  }
}
