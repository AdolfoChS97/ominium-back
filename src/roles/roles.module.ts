import { Module } from '@nestjs/common';
import { RolService } from './roles.service';
import { RolController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/roles.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Rol])],
  controllers: [RolController],
  providers: [RolService],
})
export class RolModule {}
