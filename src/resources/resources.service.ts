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

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resources)
    private readonly resourcesRepository: Repository<Resources>,
  ) {}

  async create(resource: string) {
    try {
      if (await this.getOneBy('name', resource))
        throw new BadRequestException('Resource already exists');
      const created = await this.resourcesRepository.save({ name: resource });
      return ResourceMapper(created, 'Resource created successfully');
    } catch (e) {
      throw e;
    }
  }

  async getOneBy(query: 'name' | 'id', param: string) {
    try {
      return await this.resourcesRepository
        .createQueryBuilder('resources')
        .where(`resources.${query} = :${query}`, { [query]: param })
        .getOne();
    } catch (e) {
      throw new InternalServerErrorException('Error getting resource', {
        cause: e,
      });
    }
  }

  async getAll(
    queryParams: ResourceFiltersDto & PaginationQueryParamsDto = {
      pageNumber: 1,
      pageSize: 10,
      sort: 'DESC' as Order,
      name: null,
      since: moment().format('DD-MM-YYYY'),
      until: moment().add(1, 'd').format('DD-MM-YYYY'),
    },
  ) {
    try {
      const query = queryParamsHandler(
        await this.resourcesRepository.createQueryBuilder('resources'),
        queryParams,
      );
      const [rows, total] = await (await query).getManyAndCount();
      return { rows: rows, total: total };
    } catch (e) {
      throw new InternalServerErrorException('Error getting resources', {
        cause: e,
      });
    }
  }
}
