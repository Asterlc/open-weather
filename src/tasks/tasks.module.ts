import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { WeatherServiceService } from './shared/weather-service/weather-service.service';
import { CountyServiceService } from './shared/county-service/county-service.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CountySchema } from './shared/models/CountyModel';
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'County', schema: CountySchema }])
  ],
  controllers: [TasksController],
  providers: [CountyServiceService, WeatherServiceService],
})
export class TasksModule {}
