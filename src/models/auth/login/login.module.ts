import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../database/entities/user.entity';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class LoginModule {}
