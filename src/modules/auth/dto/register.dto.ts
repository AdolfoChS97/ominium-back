import { OmitType } from '@nestjs/swagger';
import { Users } from '../../users/entities/users.entity';

export class RegisterDto extends OmitType(Users, [
  'id',
  'role',
  'created_at',
  'deleted_at',
  'updated_at',
]) {}
