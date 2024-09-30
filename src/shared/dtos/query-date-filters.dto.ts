import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class QueryDatesFiltersDto {
  @ApiProperty({
    example: '01-01-2021',
    description: 'Start date',
    default: '01-01-2021',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString({ strict: true })
  since: string;

  @ApiProperty({
    example: '01-02-2021',
    description: 'End date',
    default: '01-02-2021',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString({ strict: true })
  until: string;
}
