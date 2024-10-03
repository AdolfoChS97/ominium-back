import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { UpdatePermissionDto } from './dtos/update-permission.dto';
import {
  Order,
  PaginationQueryParamsDto,
} from 'src/shared/dtos/pagination.dto';
import { PermissionsFiltersDto } from './dtos/permission-filters.dto';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiQuery({
    name: 'pageNumber',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'sort',
    enumName: 'Order',
    enum: Order,
    required: false,
    example: Order.DESC,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'description',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'execute',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'read',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'write',
    type: Boolean,
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
  async findAll(
    @Query() queryParams: PermissionsFiltersDto & PaginationQueryParamsDto,
  ) {
    return await this.permissionsService.getAll(queryParams, false);
  }

  @ApiQuery({
    name: 'pageNumber',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'sort',
    enumName: 'Order',
    enum: Order,
    required: false,
    example: Order.DESC,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'description',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'execute',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'read',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'write',
    type: Boolean,
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
  @Get('trash')
  async getTrash(
    @Query() queryParams: PermissionsFiltersDto & PaginationQueryParamsDto,
  ) {
    return await this.permissionsService.getAll(queryParams, true);
  }

  @ApiBody({
    type: CreatePermissionDto,
    description: 'Create permission',
    required: true,
  })
  @Post()
  async create(@Body() permission: CreatePermissionDto) {
    return this.permissionsService.create(permission);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Permission id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionsService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Permission id',
  })
  @ApiBody({
    type: UpdatePermissionDto,
    description: 'Update permission',
    required: true,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() permission: UpdatePermissionDto,
  ) {
    return await this.permissionsService.update(id, permission);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Permission id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.permissionsService.delete(id);
  }
}
