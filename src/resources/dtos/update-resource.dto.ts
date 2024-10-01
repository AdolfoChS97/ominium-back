import { OmitType } from '@nestjs/swagger';
import { Resources as ResourcesEntity } from '../entities/resources.entity';

export class UpdateResourceDto extends OmitType(ResourcesEntity, [
  'id',
  'created_at',
  'updated_at',
  'deleted_at',
]) {}
