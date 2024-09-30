import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class UpdateUserDto extends OmitType(User, [
  'id',
  'rol',
  'password',
  'created_at',
  'updated_at',
  'deleted_at',
]) {
  @ApiProperty({ example: 1, description: 'Rol ID' })
  @IsNumber()
  rol_id: number;
}
