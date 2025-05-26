import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();

export const DatabaseConfig = registerAs('database', () => ({
  type: 'postgres',
  host: String(configService.getOrThrow('DATABASE_HOST')),
  port: parseInt(configService.getOrThrow('DATABASE_PORT')),
  username: String(configService.getOrThrow('DATABASE_USERNAME')),
  password: String(configService.getOrThrow('DATABASE_PASSWORD')),
  database: String(configService.getOrThrow('DATABASE_NAME')),
  entities: [__dirname + '/../database/entities/*{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  logging: configService.getOrThrow('NODE_ENV') === 'development',
  parseInt8: true,
}));
