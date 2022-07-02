import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: 'https://forecast-brasil.herokuapp.com/home',
    optionsSuccessStatus: 200 || 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.enableCors();
  // app.enableCors(
  //   { 
  //     origin: ['https://forecast-brasil.herokuapp.com/home', 'https://forecast-brasil.herokuapp.com'],
  //     methods: ['POST', 'PUT', 'DELETE', 'GET']
  //   }
  // );
  const config = new DocumentBuilder()
    .setTitle('Forecast API - Brasil')
    .setDescription('Informações clima e tempo dos municípios brasileiros')
    .setVersion('1.0.0')
    .addTag('Forecast')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 8095);
}
bootstrap();
