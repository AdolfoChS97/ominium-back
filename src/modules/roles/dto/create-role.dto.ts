import { OmitType } from '@nestjs/swagger';
import { Roles } from '../entities/roles.entity';

export class CreateRolDto extends OmitType(Roles, [
  'id',
  'created_at',
  'updated_at',
  'deleted_at',
  'user',
  'permissions',
]) {}
