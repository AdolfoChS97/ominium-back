import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(User, [
  'id',
  'role',
  'created_at',
  'deleted_at',
  'updated_at',
]) {
  @ApiProperty({ example: '3f5b002c-cf32-425c-a60d-2dad6c9f8b7c', description: 'User rol' })
  @IsString()
  role: string;
}
