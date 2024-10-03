import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { UpdatePermissionDto } from './dtos/update-permission.dto';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

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
}
