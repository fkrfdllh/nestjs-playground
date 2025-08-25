import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolePayloadDto } from './dto/role-payload.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async storeRole(@Body(new ValidationPipe()) payload: RolePayloadDto) {
    const isRoleAlreadyExists = await this.rolesService.isRoleAlreadyExists(
      payload.name.toLowerCase(),
    );

    if (isRoleAlreadyExists)
      throw new BadRequestException('role already exists');

    try {
      await this.rolesService.storeRole(payload);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'failed to store role caused by: internal server error',
      );
    }

    return 'role created';
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchRoles() {
    return await this.rolesService.fetchRoles();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body(new ValidationPipe()) payload: RolePayloadDto,
  ) {
    if ([undefined, null, NaN].includes(+id))
      throw new BadRequestException('id must be a number');

    const role = await this.rolesService.findRole(+id);

    if (!role) throw new NotFoundException('role not found');

    const isWantedRoleAlreadyExists =
      await this.rolesService.isRoleAlreadyExists(payload.name);

    if (isWantedRoleAlreadyExists)
      throw new BadRequestException(
        `role with name ${payload.name} already exists`,
      );

    try {
      await this.rolesService.updateRole(role, payload);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'failed to update role caused by: internal server error',
      );
    }

    return 'role updated';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    if ([undefined, null, NaN].includes(+id))
      throw new BadRequestException('id must be a number');

    const role = await this.rolesService.findRole(+id);

    if (!role) throw new NotFoundException('role not found');

    try {
      // await this.rolesService.deleteRole(+id);
      await this.rolesService.deleteRole(role);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        'failed to delete role caused by: internal server error',
      );
    }

    return 'role deleted';
  }
}
