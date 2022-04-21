import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountyServiceService } from './county-service.service';
import { CountySchema } from '../models/CountyModel';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'County', schema: CountySchema }]),
  ],
  providers: [CountyServiceService, HttpService],
})

export class CountyModule { }
