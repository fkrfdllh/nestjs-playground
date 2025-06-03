import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { compareBcryptWithString } from '../../../common/bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async findEmailOrUsername(emailOrUsername: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: { role: true },
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
  }

  async authenticate(
    user: User,
    password: string,
  ): Promise<
    Pick<User, 'id' | 'name' | 'email' | 'username' | 'phone' | 'role'>
  > {
    const isPasswordMatch: boolean = await compareBcryptWithString(
      password,
      user.password,
    );

    if (!isPasswordMatch)
      throw new UnauthorizedException('password does not match');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone,
      role: user.role,
    };
  }

  generateToken(payload: object) {
    return {
      access_token: this.jwtService.sign(payload),
      expires_at: moment().add('24', 'hours').toDate(),
    };
  }
}
