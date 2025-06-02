import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: typeof process.env = app.get(ConfigService).get('app');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api', {
    exclude: [''],
  });
  app.enableCors();

  await app.listen(appConfig.port ?? 3000);
}
bootstrap();
