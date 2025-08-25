import { IsNotEmpty, IsString } from 'class-validator';

export class RolePayloadDto {
  @IsNotEmpty()
  @IsString()
  readonly name!: string;
}
