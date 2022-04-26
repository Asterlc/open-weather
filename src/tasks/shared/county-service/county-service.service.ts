import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
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

    } catch (error) {
      console.log('error:>>', error);
      throw new Error('County not found');
    }
  }
}
