import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Users } from '../../users/entities/users.entity';

export class UpdateUserDto extends OmitType(Users, [
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
