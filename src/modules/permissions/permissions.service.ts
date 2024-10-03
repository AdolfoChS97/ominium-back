import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from './entities/permissions.entity';
import { errorHandler } from 'src/shared/utils/error-handler';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { PermissionMapper } from './mappers/permission.mapper';
import { UpdatePermissionDto } from './dtos/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionsRepository: Repository<Permissions>,
  ) {}

  async create(permission: CreatePermissionDto) {
    try {
      const p = await this.getOneBy('name', permission.name);
      if (p) {
        throw new Error('Permission already exists');
      }
      return await this.permissionsRepository.save(permission);
    } catch (e) {
      errorHandler(e);
    }
  }

  async update(id: string, permission: UpdatePermissionDto) {
    try {
      const p = await this.getOneBy('id', id);
      if (!p) {
        throw new NotFoundException('Permission not found');
      }
      const updated = await this.permissionsRepository.save({
        id: p.id,
        updated_at: new Date(),
        ...permission,
      });

      return PermissionMapper(updated, 'Permission updated successfully');
    } catch (e) {
      errorHandler(e);
    }
  }

  async getOneBy(param: 'name' | 'id', value: string) {
    try {
      const p = await this.permissionsRepository
        .createQueryBuilder('permissions')
        .where(`permissions.${param} = :${param}`, { [param]: value })
        .getOne();
      return p;
    } catch (e) {
      errorHandler(e);
    }
  }

  async findOne(id: string) {
    try {
      const p = await this.getOneBy('id', id);
      if (!p) {
        throw new NotFoundException('Permission not found');
      }
      return PermissionMapper(p, 'Permission retrieved successfully');
    } catch (e) {
      errorHandler(e);
    }
  }
}
