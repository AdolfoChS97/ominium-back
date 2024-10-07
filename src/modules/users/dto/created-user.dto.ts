import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Users } from '../entities/users.entity';
import { IsNumber, IsString } from 'class-validator';

export class UserDto extends OmitType(Users, [
  'role',
  'password',
  'deleted_at',
]) {
  @ApiProperty({ example: '3f5b002c-cf32-425c-a60d-2dad6c9f8b7c ', description: 'User rol' })
  @IsString()
  role: string;
}
