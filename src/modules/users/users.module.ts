import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/modules/roles/modules/roles.module';
import { Roles } from 'src/modules/roles/entities/roles.entity';
import { RolesService } from 'src/modules/roles/services/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Roles]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
