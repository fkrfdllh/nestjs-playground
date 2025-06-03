import { Module } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { PlatformsController } from './platforms.controller';
import { JwtStrategy } from '../../common/strategies/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Platform } from '../../database/entities/platform.entity.ts';

@Module({
  controllers: [PlatformsController],
  providers: [PlatformsService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User, Platform]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_KEY'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES', '24h'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PlatformsModule {}
