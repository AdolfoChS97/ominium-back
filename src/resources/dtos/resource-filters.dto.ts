import { IntersectionType, OmitType } from '@nestjs/swagger';
import { Resources } from '../entities/resources.entity';
import { QueryDatesFiltersDto } from 'src/shared/dtos/query-date-filters.dto';

export class ResourceFiltersDto extends IntersectionType(
  OmitType(Resources, ['id', 'created_at', 'updated_at', 'deleted_at']),
  QueryDatesFiltersDto,
) {}
