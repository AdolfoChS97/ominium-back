import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNumber, IsString } from 'class-validator';

export class UserDto extends OmitType(User, [
  'role',
  'password',
  'deleted_at',
]) {
  @ApiProperty({ example: '3f5b002c-cf32-425c-a60d-2dad6c9f8b7c ', description: 'User rol' })
  @IsString()
  role: string;
}
