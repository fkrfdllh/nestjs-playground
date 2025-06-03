import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './models/auth/login/login.module';
import { PlatformsModule } from './models/platforms/platforms.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      load: [AppConfig, DatabaseConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: 'master',
        children: [{ path: 'platforms', module: PlatformsModule }],
      },
    ]),
    LoginModule,
    PlatformsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
