import { DataSource, Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { protectString } from '../../common/bcrypt';

type userType = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export class UsersSeeder1748250244377 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    const roles: Role[] = await this.getRoles(dataSource);

    const users: userType[] = await Promise.all(
      roles.map(async (role: Role) => {
        const user = {
          name: null,
          email: null,
          username: null,
          password: await protectString('12345'),
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        user.name = `${role.name.slice(0, 1).toUpperCase() + role.name.slice(1, role.name.length)}`;
        user.email = `${role.name}@icm.com`;
        user.username = role.name;

        return user;
      }),
    );

    await this.storeUsers(dataSource, users);
  }

  private async getRoles(dataSource: DataSource): Promise<Role[]> {
    const repository: Repository<Role> = dataSource.getRepository(Role);
    return await repository.find();
  }

  private async storeUsers(
    dataSource: DataSource,
    users: userType[],
  ): Promise<void> {
    const repository: Repository<User> = dataSource.getRepository(User);
    await repository.insert(users);
  }
}
