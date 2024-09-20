import { OmitType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class RegisterDto extends OmitType(User, [
  'id',
  'created_at',
  'updated_at',
  'deleted_at',
]) {}
