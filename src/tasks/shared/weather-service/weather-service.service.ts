import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, tap } from 'rxjs';
@Injectable()
export class WeatherServiceService {
  constructor(
    private httpService: HttpService,
  ) { }

  private historicalURL: string = `${process.env.HISTORICAL_URL}`;
  private apiKey: string = `${process.env.API_KEY}`;
  private metric = 'metric' //Celsius
  private apiCall = "https://api.openweathermap.org/data/3.0/onecall"

  async getForecast(lat: string, lon: string) {
    try {
      const exclude = 'exclude=hourly,daily,minutely';
      const responseData = await lastValueFrom(
        this.httpService
          .get(
            `${this.apiCall}?lat=${lat}&lon=${lon}&lang=pt_br&units=${this.metric}&${exclude}&appid=${this.apiKey}`,
          )
          .pipe(
            map((obj: AxiosResponse) => obj.data),
            tap((data) => console.log(data[0])),
          ),
      );
      return responseData;
    } catch (error) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
  }

  //Paid subscription not a free service get only 5 days back
  async getFiveDaysBack(lat: string, lon: string, time: Date) {
    try {
      const unixTimestamp = Math.floor(new Date(time).getTime() / 1000);
      const respondeData = await lastValueFrom(
        this.httpService
          .get(`${this.historicalURL}?lat=${lat}&lon=${lon}&dt=${unixTimestamp}&units=${this.metric}&appid=${this.apiKey}`)
          .pipe(
            map((obj: AxiosResponse) => obj.data),
            tap((data) => console.log(data[0]))
          )
      )
      return respondeData;
    } catch (error) {
      throw new HttpException(`${error.response.data.message}`, HttpStatus.BAD_REQUEST);;
    }
  }
}
