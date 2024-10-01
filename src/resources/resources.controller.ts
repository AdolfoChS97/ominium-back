import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Order,
  PaginationQueryParamsDto,
} from 'src/shared/dtos/pagination.dto';
import { ResourceFiltersDto } from './dtos/resource-filters.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @ApiBody({
    type: CreateResourceDto,
    required: true,
    description: 'Create new resource',
  })
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
    type: String,
    description: 'Resource ID',
  })
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.resourcesService.getOneBy('id', id);
  }

  @ApiParam({
    example: 'UUID',
    name: 'id',
    required: true,
    type: String,
    description: 'Resource ID',
  })
  @ApiBody({
    type: UpdateResourceDto,
    required: true,
    description: 'Update resource',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() resource: UpdateResourceDto) {
    return await this.resourcesService.update(id, resource);
  }
}
