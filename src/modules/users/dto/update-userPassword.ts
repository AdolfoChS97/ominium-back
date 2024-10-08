import { OmitType } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Users } from '../entities/users.entity';

export class UpdateUserPasswordDto extends OmitType(Users, [
  'id',
  'name',
  'last_name',
  'phone_number',
  'email',
  'created_at',
  'updated_at',
  'deleted_at',
  'role',
  'user_name',
]) {
  @IsString()
  @MinLength(8)
  password: string;
}
