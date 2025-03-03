import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common";
async function bootstrap() {
  console.log(process.env.DB_PROVIDER)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const corsOptions = {
    origin: `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Content-Type",
    credentials:true,
  };
  app.enableCors(corsOptions);

  app.use(cookieParser());


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
