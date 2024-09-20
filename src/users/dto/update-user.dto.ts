import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends OmitType(User, [
  'id',
  'created_at',
  'updated_at',
  'deleted_at',
]) {}
