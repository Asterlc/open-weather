import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountyServiceService } from './county-service.service';

@Module({
  imports: [HttpModule],
  providers: [CountyServiceService, HttpService],
})
export class CountyModule {}
