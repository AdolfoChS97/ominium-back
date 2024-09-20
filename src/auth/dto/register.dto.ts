import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class RegisterDto extends PickType(User, [
  'name',
  'last_name',
  'phone_number',
  'email',
  'user_name',
  'password',
]) {}
