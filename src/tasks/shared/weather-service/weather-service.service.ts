import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, tap } from 'rxjs';
@Injectable()
export class WeatherServiceService {
  constructor(
    private httpService: HttpService,
  ) { }

  private currentURL: string = `${process.env.CURRENT_URL}`;
  private historicalURL: string = `${process.env.HISTORICAL_URL}`;
  private apiKey: string = `${process.env.API_KEY}`;
  private metric = 'metric' //Celsius

  async getForecast(lat: string, lon: string) {
    try {
      const exclude = 'exclude=hourly,daily,minutely';
      const responseData = await lastValueFrom(
        this.httpService
          .get(
            `${this.currentURL}?lat=${lat}&lon=${lon}&lang=pt_br&units=${this.metric}&${exclude}&appid=${this.apiKey}`,
          )
          .pipe(
            map((obj: AxiosResponse) => obj.data),
            tap((data) => console.log(data[0])),
          ),
      );
      return responseData;
    } catch (error) {
      console.log('error:>>', error);
      throw error;
    }
  }

  //Paid subscription not a free service
  // async getHistoricalWeather(lat: string, lon: string, time: string) {
  //   try {
  //     console.log('this.apiKey :>> ', this.apiKey);
  //     const unixTimestamp = Math.floor(new Date(time).getTime() / 1000);
  //     console.log(unixTimestamp);
  //     const respondeData = await lastValueFrom(
  //       this.httpService
  //         .get(`${this.historicalURL}?lat=${lat}&lon=${lon}&dt=${unixTimestamp}&units=${this.metric}&appid=${this.apiKey}`)
  //         .pipe(
  //           map((obj: AxiosResponse) => obj.data),
  //           tap((data) => console.log(data[0]))
  //         )
  //     )
  //     return respondeData;
  //   } catch (error) {
  //     console.log('error :>> ', error);
  //     throw error;
  //   }
  // }

}
