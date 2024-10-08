import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsEnum } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationQueryParamsDto {
  @ApiProperty({
    example: 1,
    description: 'Page number',
    required: false,
    default: 1,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  pageNumber: number;

  @ApiProperty({
    example: 10,
    description: 'Page size',
    required: false,
    default: 10,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  pageSize: number;

  @ApiProperty({
    example: Order.DESC,
    description: 'Sort order',
    required: false,
    enum: Order,
    default: Order.DESC,
  })
  @IsOptional()
  @IsEnum(Order)
  sort?: Order;
}
