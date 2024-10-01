import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Order,
  PaginationQueryParamsDto,
} from 'src/shared/dtos/pagination.dto';
import { ResourceFiltersDto } from './dtos/resource-filters.dto';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
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

  @ApiParam({
    example: 'UUID',
    name: 'id',
    required: true,
  })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.resourcesService.getOneBy('id', id);
  }
}
