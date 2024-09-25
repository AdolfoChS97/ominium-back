import { OmitType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class RegisterDto extends OmitType(User, [
  'id',
  'rol',
  'created_at',
  'deleted_at',
  'updated_at',
]) {}
