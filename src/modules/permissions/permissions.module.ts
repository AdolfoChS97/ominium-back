import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permissions } from './entities/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
