import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StorePlatformDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  readonly alias: string | null | undefined;

  @IsString()
  @IsOptional()
  readonly icon: string | null | undefined;
}
