import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();

export const AppConfig = registerAs('app', () => ({
  port: parseInt(configService.getOrThrow('APP_PORT'), 10) || 3000,
  nodenv: String(configService.getOrThrow('NODE_ENV')),
}));
