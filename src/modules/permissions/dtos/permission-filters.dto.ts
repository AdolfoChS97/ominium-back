import { IntersectionType, OmitType } from '@nestjs/swagger';
import { Permissions } from '../entities/permissions.entity';
import { QueryDatesFiltersDto } from 'src/shared/dtos/query-date-filters.dto';

export class PermissionsFiltersDto extends IntersectionType(
  OmitType(Permissions, [
    'id',
    'role',
    'resourcesToPermissions',
    'created_at',
    'updated_at',
    'deleted_at',
  ] as const),
  QueryDatesFiltersDto,
) {}
