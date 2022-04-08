import { Injectable, Param, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable, tap } from 'rxjs';

@Injectable()
export class CountyServiceService {
  constructor(public httpService: HttpService) {}

  async getCountyByName(name: string) {
    const responseData = await lastValueFrom(
      this.httpService
        .get(`http://localhost:9000/counties?nome=${name}`)
        .pipe(map((response: AxiosResponse) => response.data)),
    );
    return responseData;
  }
}
