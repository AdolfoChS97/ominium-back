import { Module } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { RolesController } from '../roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../entities/roles.entity';
import { PermissionsModule } from 'src/modules/permissions/permissions.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Roles]), PermissionsModule, UsersModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
