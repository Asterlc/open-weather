import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class CountyServiceService {
  constructor(public httpService: HttpService) {}

  async getCountyByName(name: string) {
    try {
      const responseData = await lastValueFrom(
        this.httpService
          .get(`http://localhost:9000/counties?countyName=${name}`)
          .pipe(map((response: AxiosResponse) => response.data)),
      );
      return responseData;
    } catch (error) {
      console.log('error:>>', error);
      throw new Error('County not found');
    }
  }
}
