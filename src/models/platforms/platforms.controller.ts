import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StorePlatformDto } from './dto/store-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';

@Controller()
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async storePlatform(
    @Res({ passthrough: true }) response: Response,
    @Body(new ValidationPipe()) body: StorePlatformDto,
  ) {
    const isPlatformAlreadyExists =
      await this.platformsService.isPlatformAlreadyExists(body.name);

    if (isPlatformAlreadyExists) {
      response.status(HttpStatus.BAD_REQUEST).json('platform already exists');
      return;
    }

    try {
      await this.platformsService.storePlatform(body);
    } catch (err) {
      console.error(err);

      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(`failed to store platform caused by: internal server error`);
      return;
    }

    response.status(HttpStatus.CREATED).json('platform stored');
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchPlatforms(@Res({ passthrough: true }) response: Response) {
    response.json(await this.platformsService.fetchPlatforms());

    return;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePlatform(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string,
    @Body(new ValidationPipe()) payload: UpdatePlatformDto,
  ) {
    if ([undefined, null, NaN].includes(+id)) {
      response.status(HttpStatus.BAD_REQUEST).json('id must be a number');
      return;
    }

    const platform = await this.platformsService.findPlatform(+id);

    if (!platform) {
      response.status(HttpStatus.NOT_FOUND).json('platform not found');
      return;
    }

    try {
      await this.platformsService.updatePlatform(platform, payload);
    } catch (err) {
      console.error(err);

      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('failed to update platform caused by: internal server error');
      return;
    }

    response.json('platform updated');
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePlatform(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string,
  ) {
    if ([undefined, null, NaN].includes(+id)) {
      response.status(HttpStatus.BAD_REQUEST).json('id must be a number');
      return;
    }

    const platform = await this.platformsService.findPlatform(+id);

    if (!platform) {
      response.status(HttpStatus.NOT_FOUND).json('platform not found');
      return;
    }

    try {
      await this.platformsService.deletePlatform(platform);
    } catch (err) {
      console.error(err);

      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('failed to update platform caused by: internal server error');
      return;
    }

    response.json('platform updated');
    return;
  }
}
