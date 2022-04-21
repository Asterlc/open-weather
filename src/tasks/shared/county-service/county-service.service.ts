import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CountySchema } from '../models/CountyModel'
@Injectable()
export class CountyServiceService {
  constructor(
    public httpService: HttpService,
    @InjectModel('County') private readonly countyModel: Model<any>
  ) { }

  async getCountyByName(name: string) {
    try {
      const responseData = await this.countyModel.find({'countyName': name}).exec();
      return responseData

      // const responseData = await lastValueFrom(
      //   this.httpService
      //     .get(`http://localhost:9000/counties?countyName=${name}`)
      //     .pipe(map((response: AxiosResponse) => response.data)),
      // );
      // return responseData;
    } catch (error) {
      console.log('error:>>', error);
      throw new Error('County not found');
    }
  }
}
