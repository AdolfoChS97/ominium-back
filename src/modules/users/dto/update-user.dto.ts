import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends OmitType(User, [
  'id',
  'role',
  'password',
  'created_at',
  'updated_at',
  'deleted_at',
]) {
  @ApiProperty({ example: '3f5b002c-cf32-425c-a60d-2dad6c9f8b7c', description: 'Rol ID' })
  @IsString()
  rol_id: string;
}
