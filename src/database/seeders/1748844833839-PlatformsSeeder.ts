import { DataSource, Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Platform } from '../entities/platform.entity.ts';

type platformType = {
  name: string;
  alias: string | null;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class PlatformsSeeder1748844833839 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    const platforms: platformType[] = [
      {
        name: 'twitter',
        alias: 'X',
        icon: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'instagram',
        alias: 'Instagram',
        icon: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'facebook',
        alias: 'Facebook',
        icon: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'tiktok',
        alias: 'TikTok',
        icon: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'youtube',
        alias: 'YouTube',
        icon: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const repository: Repository<Platform> = dataSource.getRepository(Platform);
    await repository.insert(platforms);
  }
}
