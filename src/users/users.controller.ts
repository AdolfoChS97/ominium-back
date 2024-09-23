import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationQueryParamsDto } from 'src/shared/dtos/paginatio.dto';
import { Order } from 'src/shared/dtos/paginatio.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

@Get()
@ApiQuery({ name: 'pageNumber', type: 'number', required: true, example: 1 })
@ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
@ApiQuery({ name: 'sortOrder', type: 'string', required: false, enum: Order })
async findAll(
  @Query() { pageNumber, pageSize, sortOrder }: PaginationQueryParamsDto,
) {
  try {
    const data = await this.usersService.findAll({
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortOrder: sortOrder,
    });
    return data;
 
  } catch (e) {
    throw e;
  }
}


  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/byUsername/:user_name')
  findOneByUserName(@Param('user_name') user_name: string) {
    return this.usersService.findOneByUserName(user_name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
