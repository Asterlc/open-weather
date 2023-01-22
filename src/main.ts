import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('PORT :>> ', process.env.PORT);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
