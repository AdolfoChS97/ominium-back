import { OmitType } from '@nestjs/swagger';
import { Permissions } from '../entities/permissions.entity';

export class CreatePermissionDto extends OmitType(Permissions, [
  'id',
  'role',
  'created_at',
  'updated_at',
  'deleted_at',
] as const) {}
