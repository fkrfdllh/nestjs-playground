import { IsOptional, IsString } from 'class-validator';

export class UpdatePlatformDto {
  @IsOptional()
  @IsString()
  name: string | null | undefined;

  @IsOptional()
  @IsString()
  alias: string | null | undefined;

  @IsOptional()
  @IsString()
  icon: string | null | undefined;
}
