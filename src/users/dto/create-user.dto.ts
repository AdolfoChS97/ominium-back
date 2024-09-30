import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNumber } from 'class-validator';

export class CreateUserDto extends OmitType(User, [
  'id',
  'rol',
  'created_at',
  'deleted_at',
  'updated_at',
]) {
  @ApiProperty({ example: '1', description: 'User rol' })
  @IsNumber()
  rol_id: number;
}
