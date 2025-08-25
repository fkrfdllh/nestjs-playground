import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { JwtStrategy } from '../../common/strategies/jwt-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Role } from '../../database/entities/role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [RolesController],
  providers: [RolesService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
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
export class RolesModule {}
