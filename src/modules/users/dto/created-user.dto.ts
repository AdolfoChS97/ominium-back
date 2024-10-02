import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsNumber } from 'class-validator';

export class UserDto extends OmitType(User, ['rol', 'password', 'deleted_at']) {
  @ApiProperty({ example: '1', description: 'User rol' })
  @IsNumber()
  rol_id: number;
}
