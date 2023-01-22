import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class CountyServiceService {
  constructor(
    @InjectModel('County') private readonly countyModel: Model<any>
  ) { }
  // /\bpalavra\b/i
  async getCountyByName(name: string) {
    try {
      const query = name.length > 0 ? { 'countyName': { $regex: `.*${name.trim()}*.`, $options: 'i' } } : {};
      console.log('query :>> ', query);
      const responseData = await this.countyModel.find(query).exec();
      return responseData;
    } catch (error) {
      throw new Error('Error has occurred');
    }
  }
}
