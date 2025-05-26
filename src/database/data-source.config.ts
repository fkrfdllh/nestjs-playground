import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const configService = new ConfigService();

config();

const options: DataSourceOptions & SeederOptions = {
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
  seeds: [__dirname + '/../database/seeders/*{.ts,.js}'],
};

export default new DataSource(options);
