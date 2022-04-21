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
      envFilePath: [`.env.dev` || `.env.prod`],
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.5mmts.mongodb.net/counties?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.5mmts.mongodb.net/counties?retryWrites=true&w=majority`,

