import { IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @IsString()
  readonly emailOrUsername: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
