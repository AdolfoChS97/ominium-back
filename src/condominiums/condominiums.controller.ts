import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CondominiumsService } from './condominiums.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Order, PaginationQueryParamsDto } from 'src/shared/dtos/pagination.dto';

@ApiTags('Condominiums')
@Controller('condominiums')
export class CondominiumsController {
  constructor(private readonly condominiumsService: CondominiumsService) {}

  @Post()
  create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumsService.create(createCondominiumDto);
  }

  @Get()
  @ApiQuery({ name: 'pageNumber', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: Number, required: true, example: 10 })
  @ApiQuery({ name: 'sort', type: String, required: false, enum: Order })
  async findAll(
    @Query() { pageNumber, pageSize, sort }: PaginationQueryParamsDto,
  ) {
    try {
    const data = await this.condominiumsService.findAll({
      pageNumber: pageNumber,
      pageSize: pageSize,
      sort: sort,
    })

    return data
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.condominiumsService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCondominiumDto: UpdateCondominiumDto) {
    try {
      return this.condominiumsService.update(id, updateCondominiumDto);
    } catch (error) {
      
      throw error;
    }
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    try {
      return this.condominiumsService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
