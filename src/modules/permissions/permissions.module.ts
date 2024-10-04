import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permissions } from './entities/permissions.entity';
import { ResourcesToPermissions } from '../resources/entities/resources-to-permissions.entity';
import { Resources } from '../resources/entities/resources.entity';
import { ResourcesService } from '../resources/resources.service';
import { ResourcesToPermissionsService } from './services/resources-to-permissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permissions, ResourcesToPermissions, Resources]),
  ],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    ResourcesService,
    ResourcesToPermissionsService,
  ],
  exports: [
    PermissionsService,
    ResourcesToPermissionsService,
    ResourcesService,
  ],
})
export class PermissionsModule {}
