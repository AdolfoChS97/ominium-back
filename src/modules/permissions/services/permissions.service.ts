import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from '../entities/permissions.entity';
import { errorHandler } from 'src/shared/utils/error-handler';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { PermissionMapper } from '../mappers/permission.mapper';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { PermissionsFiltersDto } from '../dtos/permission-filters.dto';
import {
  Order,
  PaginationQueryParamsDto,
} from 'src/shared/dtos/pagination.dto';
import * as moment from 'moment';
import { ResourcesService } from '../../resources/resources.service';
import { ResourcesToPermissionsService } from './resources-to-permissions.service';
// import { RolesService } from 'src/modules/roles/services/roles.service';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionsRepository: Repository<Permissions>,
    private readonly resourcesService: ResourcesService,
    private readonly resourcesToPermissionsService: ResourcesToPermissionsService,
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

  async addRole(id: string, roleId: string) {
    try {
      const updated = await this.permissionsRepository.save({
        id: id,
        role: roleId,
        updated_at: new Date(),
      });
      return PermissionMapper(updated, 'Role added successfully');
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
      const r = await this.resourcesToPermissionsService.findAll(
        queryParams,
        trash,
      );
      return {
        rows: { ...r },
      };
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

  async assign(id: string, resourceId: string) {
    try {
      const [p, r] = await (
        await Promise.allSettled([
          await this.getOneBy('id', id),
          await this.resourcesService.getOneBy('id', resourceId),
        ])
      ).map((p: PromiseSettledResult<Awaited<any>>) => {
        const { status } = p;
        if (status === 'fulfilled') return p?.value;
        return null;
      }, []);

      if (!p || !r) {
        throw new BadRequestException(
          'We could not assign a resource to a null',
        );
      }

      const isAlreadyAssigned = await this.resourcesToPermissionsService.check(
        r.id,
        p.id,
      );

      if (isAlreadyAssigned) {
        throw new BadRequestException(
          'We could not reassign this resource to this permission',
        );
      }

      return await this.resourcesToPermissionsService.create(r.id, p.id);
    } catch (e) {
      errorHandler(e);
    }
  }

  async unassign(id: string, resourceId: string) {
    try {
      const [p, r] = await (
        await Promise.allSettled([
          await this.getOneBy('id', id),
          await this.resourcesService.getOneBy('id', resourceId),
        ])
      ).map((p: PromiseSettledResult<Awaited<any>>) => {
        const { status } = p;
        if (status === 'fulfilled') return p?.value;
        return null;
      }, []);

      if (!p || !r) {
        throw new BadRequestException(
          'We could not unassign a resource to a null',
        );
      }

      const hasAssigned = await this.resourcesToPermissionsService.check(
        r.id,
        p.id,
      );

      if (!hasAssigned) {
        throw new BadRequestException(
          'We could not unassign this resource to this permission because it is not assigned',
        );
      }

      return await this.resourcesToPermissionsService.delete(hasAssigned.id);
    } catch (e) {
      errorHandler(e);
    }
  }
}
