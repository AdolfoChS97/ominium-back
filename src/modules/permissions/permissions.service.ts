import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from './entities/permissions.entity';
import { errorHandler } from 'src/shared/utils/error-handler';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { PermissionMapper } from './mappers/permission.mapper';
import { UpdatePermissionDto } from './dtos/update-permission.dto';
import { PermissionsFiltersDto } from './dtos/permission-filters.dto';
import {
  Order,
  PaginationQueryParamsDto,
} from 'src/shared/dtos/pagination.dto';
import * as moment from 'moment';
import { queryParamsHandler } from 'src/shared/utils/query-params-handler';

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
        throw new BadRequestException('Permission already exists');
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

      const previous = await this.permissionExists(permission.name, id, true);

      if (previous) {
        throw new BadRequestException('Permission already exists');
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

  async getAll(
    queryParams: PermissionsFiltersDto & PaginationQueryParamsDto = {
      pageNumber: 1,
      pageSize: 10,
      sort: 'DESC' as Order,
      since: moment().format('DD-MM-YYYY'),
      until: moment().add(1, 'd').format('DD-MM-YYYY'),
      name: null,
      description: null,
      execute: null,
      read: null,
      write: null,
    },
    trash: boolean = false,
  ) {
    try {
      const query = queryParamsHandler(
        await this.permissionsRepository
          .createQueryBuilder('permissions')
          .select(['permissions.*']),
        queryParams,
        trash,
      );
      const rows = await (await query).getRawMany();
      return { rows: rows, total: rows.length };
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

  async delete(id: string) {
    try {
      const p = await this.getOneBy('id', id);
      if (!p) {
        throw new NotFoundException('Permission not found');
      }
      const deleted = await this.permissionsRepository.save({
        id: p.id,
        deleted_at: new Date(),
      });
      return PermissionMapper(deleted, 'Permission deleted successfully');
    } catch (e) {
      errorHandler(e);
    }
  }

  async permissionExists(
    name: string,
    id: string = '',
    itself: boolean = false,
  ) {
    try {
      let query = this.permissionsRepository
        .createQueryBuilder('permissions')
        .select(['permissions.name'])
        .where('permissions.name = :name', { name })
        .where('permissions.deleted_at is null');

      if (itself) {
        query = query.andWhere('permissions.id != :id', { id });
      }

      const previousRecord = await query.getOne();
      return previousRecord;
    } catch (error) {
      throw error;
    }
  }
}
