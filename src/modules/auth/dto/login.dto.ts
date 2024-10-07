import { PickType } from '@nestjs/swagger';
import { Users } from '../../users/entities/users.entity';

export class LoginDto extends PickType(Users, [
  'password',
  'user_name',
] as const) {}
