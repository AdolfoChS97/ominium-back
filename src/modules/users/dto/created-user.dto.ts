import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Users } from '../entities/users.entity';
import { IsNumber } from 'class-validator';

export class UserDto extends OmitType(Users, [
  'role',
  'password',
  'deleted_at',
]) {
  @ApiProperty({ example: '1', description: 'User rol' })
  @IsNumber()
  role: number;
}
