import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, tap } from 'rxjs';
import { CountyServiceService } from '../county-service/county-service.service';

@Injectable()
export class WeatherServiceService {
  constructor(
    public countyService: CountyServiceService,
    public httpService: HttpService,
  ) {}

  async getForecast(lat: string, lon: string) {
    try {
      const metric = 'metric'; //Celsius
      const apiKey = 'c6752ce2571c6019d096a93bdb9131b3';
      const baseURL = 'https://api.openweathermap.org/data/2.5/onecall';
      const exclude = 'exclude=hourly,daily,minutely';
      //Converter para pasta de gitignore posteriormente
      const responseData = await lastValueFrom(
        this.httpService
          .get(
            `${baseURL}?lat=${lat}&lon=${lon}&lang=pt_br&units=${metric}&${exclude}&appid=${apiKey}`,
          )
          .pipe(
            map((obj: AxiosResponse) => {
              console.log('obj.data', obj.data);
              return obj.data;
            }),
            tap((data) => console.log(data[0])),
          ),
      );
      return responseData;
    } catch (error) {
      console.log('error:>>', error);
      throw error;
    }
  }
}
