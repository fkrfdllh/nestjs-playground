import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Platform } from '../../database/entities/platform.entity.ts';
import { InjectRepository } from '@nestjs/typeorm';
import { StorePlatformDto } from './dto/store-platform.dto.js';
import { UpdatePlatformDto } from './dto/update-platform.dto.js';

@Injectable()
export class PlatformsService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async isPlatformAlreadyExists(name: string): Promise<boolean> {
    return await this.platformRepository.exists({
      where: { name: name.toLowerCase() },
    });
  }

  async storePlatform(body: StorePlatformDto): Promise<void> {
    body.name = body.name.toLowerCase();

    if (body.name.includes(' ')) body.name = body.name.replaceAll(' ', '_');

    await this.platformRepository.save(this.platformRepository.create(body));
  }

  async fetchPlatforms(): Promise<Platform[]> {
    return await this.platformRepository.find({
      select: { id: true, name: true, alias: true, icon: true },
      order: { id: 'ASC' },
    });
  }

  async findPlatform(id: number): Promise<Platform> {
    return await this.platformRepository.findOne({
      where: { id },
    });
  }

  async updatePlatform(
    platform: Platform,
    payload: UpdatePlatformDto,
  ): Promise<void> {
    const updatedPlatform = this.platformRepository.create({
      ...platform,
      ...payload,
    });

    await this.platformRepository.save(updatedPlatform);
  }

  async deletePlatform(platform: Platform): Promise<void> {
    await this.platformRepository.softRemove(
      this.platformRepository.create(platform),
    );
  }
}
