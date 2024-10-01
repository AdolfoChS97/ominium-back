import { PickType } from '@nestjs/swagger';
import { Resources as ResourcesEntity } from '../entities/resources.entity';

export class CreateResourceDto extends PickType(ResourcesEntity, [
  'name',
  'path',
  'parent',
  'order',
]) {}
