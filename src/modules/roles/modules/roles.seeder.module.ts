import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../entities/roles.entity';
import { RolesSeederService } from '../services/roles.service.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  exports: [RolesSeederService],
  providers: [RolesSeederService],
})
export class RolesSeederModule {}
