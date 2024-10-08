import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { CreateRolDto } from './dto/create-role.dto';
import { UpdateRolDto } from './dto/update-role.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Order, PaginationQueryParamsDto } from 'src/shared/dtos/pagination.dto';
import { QueryDatesFiltersDto } from 'src/shared/dtos/query-date-filters.dto';
import { query } from 'express';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolesService.create(createRolDto);
  }


  @Get()
  @ApiQuery({ name : 'pageNumber' , type: Number, required: true, example: 1 })
  @ApiQuery({ name : 'pageSize' , type: Number, required: true, example: 10 })
  @ApiQuery({
    name: 'sort',
    enumName: 'Order',
    enum: Order,
    required: false,
  })
  @ApiQuery ({name : 'until', type: String, required: false})
  @ApiQuery ({name : 'since', type: String, required: false})
  async findAll(
    @Query()queryParams: PaginationQueryParamsDto & QueryDatesFiltersDto
  ) {
    try {
      return await this.rolesService.findAll(queryParams);
    } catch (error) {
      throw error;
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.rolsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolesService.update(id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  @ApiParam({ name: 'Role id', required: true, type: String })
  @ApiParam({ name: 'Permission id', required: true, type: String })
  @Post(':id/assign/:permissionId')
  assign(@Param('id') id: string, @Param('permissionId') permissionId: string) {
    return this.rolesService.assign(id, permissionId);
  }
}
