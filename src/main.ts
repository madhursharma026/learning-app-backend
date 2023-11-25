import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
const cors = require( `cors` );

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use( cors() );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      stopAtFirstError: true,
    }),
  );
  await app.listen(3001);
}
bootstrap();

