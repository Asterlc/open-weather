import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedDomains = ['https://forecast-brasil.herokuapp.com/'];
  const options = {
    origin: (origin: any, cb: any) => {
      if (allowedDomains.includes(origin)) {
        cb(null, origin);
      } else {
        cb(Error('invalid origin'));
      }
    },
    methods: 'GET,HEAD',
  }

  app.enableCors(options);

  const config = new DocumentBuilder()
    .setTitle('Forecast API - Brasil')
    .setDescription('Informações clima e tempo dos municípios brasileiros')
    .setVersion('1.0.3')
    .addTag('Forecast')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 8095);
}
bootstrap();
