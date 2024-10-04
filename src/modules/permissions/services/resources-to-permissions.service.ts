import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourcesToPermissions } from 'src/modules/resources/entities/resources-to-permissions.entity';
import { errorHandler } from 'src/shared/utils/error-handler';
import { Repository } from 'typeorm';

@Injectable()
export class ResourcesToPermissionsService {
  constructor(
    @InjectRepository(ResourcesToPermissions)
    private readonly resourcesToPermissionsRepository: Repository<ResourcesToPermissions>,
  ) {}

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
