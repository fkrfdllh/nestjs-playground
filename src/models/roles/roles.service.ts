import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../../database/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePayloadDto } from './dto/role-payload.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async isRoleAlreadyExists(name: string): Promise<boolean> {
    return await this.roleRepository.existsBy({ name });
  }

  async storeRole(payload: RolePayloadDto): Promise<void> {
    await this.roleRepository.save(this.roleRepository.create(payload));
  }

  async fetchRoles(): Promise<Role[]> {
    return await this.roleRepository.find({
      select: { id: true, name: true },
      order: { id: 'DESC' },
    });
  }

  async findRole(id: number): Promise<Role> {
    return await this.roleRepository.findOneBy({ id });
  }

  async updateRole(role: Role, payload: RolePayloadDto): Promise<void> {
    await this.roleRepository.save(
      this.roleRepository.create({ ...role, ...payload }),
    );
  }

  async deleteRole(
    role: Role,
    // id: number
  ): Promise<void> {
    // await this.roleRepository.softDelete(id);
    await this.roleRepository.softRemove(this.roleRepository.create(role));
  }
}
