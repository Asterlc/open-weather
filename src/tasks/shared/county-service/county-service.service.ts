import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class CountyServiceService {
  constructor(
    @InjectModel('County') private readonly countyModel: Model<any>
  ) { }

  async getCountyByName(name: string) {
    try {
      const query = name ? { 'countyName': { $regex: `.*${name.trim()}*.`, $options: 'i' } } : {};
      const responseData = await this.countyModel.find(query).exec();
      return responseData;
    } catch (error) {
      console.log('error county:>>', error);
      throw new Error('Error has occurred');
    }
  }
}
