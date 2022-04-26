import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// eslint-disable-next-line prettier/prettier
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.prod` || '.env.dev'],
    }),
    MongooseModule.forRoot(
      `${process.env.MONGODB_URI}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
