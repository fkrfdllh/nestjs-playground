import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';
import { loginDto } from './dto/login.dto';
import { User } from '../../../database/entities/user.entity';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body(new ValidationPipe()) body: loginDto,
  ) {
    const user = await this.loginService.findEmailOrUsername(
      body.emailOrUsername,
    );

    if (!user) {
      response
        .status(HttpStatus.UNAUTHORIZED)
        .json("email or username doesn't exists");

      return;
    }

    let userResult: Pick<User, 'name' | 'email' | 'username' | 'phone'> | null =
      null;

    try {
      userResult = await this.loginService.authenticate(user, body.password);
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        response
          .status(HttpStatus.UNAUTHORIZED)
          .json(`failed to authenticate caused by: ${err.message}`);
        return;
      }

      console.error(err);

      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(`failed to authenticate caused by: internal server error`);
      return;
    }

    const { access_token, expires_at } =
      this.loginService.generateToken(userResult);

    response.status(HttpStatus.OK).json({
      access_token,
      expires_at,
      user: userResult,
    });

    return;
  }
}
