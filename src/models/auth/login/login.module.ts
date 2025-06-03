import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../database/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../../common/strategies/jwt-strategy';

@Module({
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
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
export class LoginModule {}
