import { OmitType } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class RegisterDto extends OmitType(User, [
  'id',
  'role',
  'created_at',
  'deleted_at',
  'updated_at',
]) {}
