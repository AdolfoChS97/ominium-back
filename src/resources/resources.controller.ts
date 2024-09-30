import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Order, PaginationQueryParamsDto } from 'src/shared/dtos/pagination.dto';
import { ResourceFiltersDto } from './dtos/resource-filters.dto';
import { QueryDatesFiltersDto } from 'src/shared/dtos/query-date-filters.dto';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post('')
  async create(
    @Body()
    { name }: CreateResourceDto,
  ) {
    return await this.resourcesService.create(name);
  }

  @ApiQuery({
    name: 'pageNumber',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    enumName: 'Order',
    enum: Order,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'until',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'since',
    type: String,
    required: false,
  })
  @Get()
  async getAll(
    @Query() queryParams: ResourceFiltersDto & PaginationQueryParamsDto,
  ) {
    return await this.resourcesService.getAll(queryParams);
  }
}
