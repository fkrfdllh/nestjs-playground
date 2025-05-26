import { DataSource, Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../entities/role.entity';

export class RolesSeeder1748232341578 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    const roles: { name: string }[] = [
      'developer',
      'administrator',
      'user',
    ].map((role) => ({
      name: role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const repository: Repository<Role> = dataSource.getRepository(Role);

    await repository.insert(roles);
  }
}
