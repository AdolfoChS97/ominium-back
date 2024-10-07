import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { ResourcesToPermissions } from 'src/modules/resources/entities/resources-to-permissions.entity';
import {
  PaginationQueryParamsDto,
  Order,
} from 'src/shared/dtos/pagination.dto';
import { errorHandler } from 'src/shared/utils/error-handler';
import { Repository } from 'typeorm';
import { PermissionsFiltersDto } from '../dtos/permission-filters.dto';
import { queryParamsHandler } from 'src/shared/utils/query-params-handler';

@Injectable()
export class ResourcesToPermissionsService {
  constructor(
    @InjectRepository(ResourcesToPermissions)
    private readonly resourcesToPermissionsRepository: Repository<ResourcesToPermissions>,
  ) {}

  async findAll(
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
        await this.resourcesToPermissionsRepository
          .createQueryBuilder('rtp')
          .select([
            'rtp.id',
            'rtp.resourceId AS resource',
            'resources.id',
            'resources.name',
            'resources.route AS route',
            'rtp.permissionId AS permission',
            'permissions.name',
            'permissions.execute',
            'permissions.read',
            'permissions.write',
            'rtp.created_at',
            'rtp.updated_at',
            'rtp.deleted_at',
          ])
          .leftJoin('rtp.resourceId', 'resources')
          .leftJoin('rtp.permissionId', 'permissions'),
        queryParams,
        trash,
      );
      const rows = await (await query).getRawMany();
      return { rows: rows, total: rows.length };
    } catch (e) {
      errorHandler(e);
    }
  }

  async create(resourceId: string, permissionId: string) {
    try {
      const c = await this.resourcesToPermissionsRepository.create({
        resourceId: resourceId,
        permissionId: permissionId,
      });

      return await this.resourcesToPermissionsRepository.save(c);
    } catch (e) {
      errorHandler(e);
    }
  }

  async check(resourceId: string, permissionId: string) {
    try {
      const result = await this.resourcesToPermissionsRepository
        .createQueryBuilder('resources_to_permissions')
        .where('resources_to_permissions.resourceId = :resourceId', {
          resourceId: resourceId,
        })
        .andWhere('resources_to_permissions.permissionId = :permissionId', {
          permissionId: permissionId,
        })
        .getOne();

      if (!result) {
        return null;
      }

      return result;
    } catch (e) {
      errorHandler(e);
    }
  }

  async delete(id: string) {
    try {
      const deleted = await this.resourcesToPermissionsRepository.save({
        id: id,
        deleted_at: new Date(),
      });
      return deleted;
    } catch (e) {
      errorHandler(e);
    }
  }
}
