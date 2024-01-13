import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Hachthon Project')
    .setDescription('The Hackthon API description')
    .setVersion('1.0')
    .addCookieAuth("ACCESS_TOKEN")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
