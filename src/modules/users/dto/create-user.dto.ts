import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Users } from '../entities/users.entity';
import { IsNumber } from 'class-validator';

export class CreateUserDto extends OmitType(Users, [
  'id',
  'role',
  'created_at',
  'deleted_at',
  'updated_at',
]) {
  @ApiProperty({ example: '1', description: 'User rol' })
  @IsNumber()
  role: string;
}
