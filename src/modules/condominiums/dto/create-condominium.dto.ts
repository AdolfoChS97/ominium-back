import { OmitType } from '@nestjs/swagger';
import { Condominium } from '../entities/condominium.entity';

export class CreateCondominiumDto extends OmitType(Condominium, [
  'id',
  'created_at',
  'updated_at',
  'deleted_at',
]) {}
