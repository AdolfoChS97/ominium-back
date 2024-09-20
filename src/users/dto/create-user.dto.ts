import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto extends OmitType(User, [
  'id',
  'created_at',
  'deleted_at',
  'updated_at',
]) {}
