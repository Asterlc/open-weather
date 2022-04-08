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
      console.log('latitude', lat);
      console.log('longitude', lon);
      const responseData = await lastValueFrom(
        this.httpService
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pt_br&exclude=hourly,daily&appid=c6752ce2571c6019d096a93bdb9131b3`,
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
      console.log('error:>>', error, null, 4);
      throw new Error('Error getForecast');
    }
  }
}
