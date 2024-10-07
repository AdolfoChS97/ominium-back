import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Resources } from './entities/resources.entity';
import { Repository } from 'typeorm';
import { ResourceMapper } from './mappers/resources.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Order,
  PaginationQueryParamsDto,
} from 'src/shared/dtos/pagination.dto';
import { ResourceFiltersDto } from './dtos/resource-filters.dto';
import * as moment from 'moment';
import { queryParamsHandler } from 'src/shared/utils/query-params-handler';
import { errorHandler } from 'src/shared/utils/error-handler';
import { UpdateResourceDto } from './dtos/update-resource.dto';
import { CreateResourceDto } from './dtos/create-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resources)
    private readonly resourcesRepository: Repository<Resources>,
  ) {}

  async create(resource: CreateResourceDto) {
    try {
      const r = await this.getOneBy('name', resource.name);
      if (r) throw new BadRequestException('Resource already exists');

      if (resource.order && resource.parent) {
        const parent = await this.getOneBy('id', resource.parent as string);
        if (!parent)
          throw new BadRequestException(
            'We could not assign a resource to a non-existent parent',
          );

        const created = await this.resourcesRepository.save({
          ...resource,
          parent: parent,
        });

        return ResourceMapper(created, 'Resource created successfully');
      }

      const created = await this.resourcesRepository.save({
        ...resource,
      });

      return ResourceMapper(created, 'Resource created successfully');
    } catch (e) {
      errorHandler(e);
    }
  }

  async assign(parent: string, child: string) {
    try {
      if (!parent || !child)
        throw new BadRequestException(
          'It needs at least two resources to assign them',
        );

      const promises = await Promise.allSettled([
        this.getOneBy('id', parent),
        this.getOneBy('id', child),
      ]);

      const [parentR, childR] = promises.map(
        (p: PromiseSettledResult<Awaited<any>>) => {
          const { status } = p;
          if (status === 'rejected')
            throw new InternalServerErrorException(
              'We could not process the request',
            );
          return p?.value;
        },
        [],
      );

      if (parentR.parentId)
        throw new BadRequestException(
          'We could not assign a child resource as a parent resource',
        );

      if (childR.parent) {
        throw new BadRequestException(
          'This child resource already has a parent resource',
        );
      }

      const updated = await this.resourcesRepository.update(childR.id, {
        parent: parentR,
        order:
          (await this.getLastChildrenByParent(
            parentR.id as unknown as string,
          )) + 1,
        updated_at: new Date(),
      });

      if (updated.affected === 0)
        throw new InternalServerErrorException(
          'We could not process the request',
        );

      return {
        message: 'Resource assigned successfully',
      };
    } catch (e) {
      errorHandler(e);
    }
  }

  async removeParentByChild(parent: string, child: string) {
    try {
      if (!parent || !child)
        throw new BadRequestException(
          'It needs at least two resources to remove them',
        );

      const promises = await Promise.allSettled([
        this.getOneBy('id', parent),
        this.getOneBy('id', child),
      ]);

      const [parentR, childR] = promises.map(
        (p: PromiseSettledResult<Awaited<any>>) => {
          const { status } = p;
          if (status === 'rejected')
            throw new InternalServerErrorException(
              'We could not process the request',
            );
          return p?.value;
        },
        [],
      );

      if (parentR?.parentId)
        throw new BadRequestException(
          'We could not remove a non parent resource',
        );

      const updated = await this.resourcesRepository.update(childR.id, {
        parent: null,
        order: null,
        updated_at: new Date(),
      });

      if (updated.affected === 0)
        throw new InternalServerErrorException(
          'We could not process the request',
        );

      return {
        message: 'Resource removed successfully',
      };
    } catch (e) {
      errorHandler(e);
    }
  }

  async update(id: string, resource: UpdateResourceDto) {
    try {
      const r = await this.getOneBy('id', id);
      if (!r) throw new BadRequestException('Resource not found');

      const updated = await this.resourcesRepository.save({
        id: r.id,
        updated_at: new Date(),
        ...resource,
      });

      return ResourceMapper(updated, 'Resource updated successfully');
    } catch (e) {
      errorHandler(e);
    }
  }

  async getOneBy(query: 'name' | 'id', param: string) {
    try {
      const r = await this.resourcesRepository
        .createQueryBuilder('resources')
        .select(['resources.*'])
        .where(`resources.${query} = :${query}`, { [query]: param })
        .getRawOne();
      return r;
    } catch (e) {
      errorHandler(e);
    }
  }

  async getLastChildrenByParent(parent: string): Promise<number> {
    try {
      const p = await this.getOneBy('id', parent);
      if (!p) throw new BadRequestException('Resource not found');

      if (p.parent)
        throw new BadRequestException(
          'We could not get the last children of a non parent resource',
        );

      return this.resourcesRepository
        .createQueryBuilder('resources')
        .where('resources.parent = :parent', { parent: parent })
        .orderBy('resources.order', 'DESC')
        .getCount();
    } catch (e) {
      errorHandler(e);
    }
  }

  async getAll(
    queryParams: ResourceFiltersDto & PaginationQueryParamsDto = {
      pageNumber: 1,
      pageSize: 10,
      sort: 'DESC' as Order,
      name: null,
      parent: null,
      children: null,
      route: null,
      order: null,
      since: moment().format('DD-MM-YYYY'),
      until: moment().add(1, 'd').format('DD-MM-YYYY'),
    },
    trash: boolean = false,
  ) {
    try {
      const query = queryParamsHandler(
        await this.resourcesRepository
          .createQueryBuilder('resources')
          .leftJoinAndSelect('resources.parent', 'parent')
          .select(['resources.*']),
        queryParams,
        trash,
      );
      const rows = await (await query).getRawMany();
      return { rows: rows, total: rows.length };
    } catch (e) {
      errorHandler(e);
    }
  }

  async getChildrenByParent(parent: string) {
    try {
      const children = await this.resourcesRepository
        .createQueryBuilder('resources')
        .where('resources.parentId = :parent', { parent: parent })
        .getRawMany();

      return children;
    } catch (e) {
      errorHandler(e);
    }
  }

  async delete(id: string) {
    try {
      const r = await this.getOneBy('id', id);
      if (!r) throw new BadRequestException('Resource not found');

      const children = await this.getChildrenByParent(r.id);
      if (children.length > 0)
        throw new BadRequestException(
          'We could not delete a parent resource with children',
        );

      const deleted = await this.resourcesRepository.save({
        id: r.id,
        deleted_at: new Date(),
      });
      return ResourceMapper(deleted, 'Resource deleted successfully');
    } catch (e) {
      errorHandler(e);
    }
  }
}
