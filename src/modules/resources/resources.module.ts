import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesService } from './resources.service';
import { Resources } from './entities/resources.entity';
import { ResourcesController } from './resources.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resources])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
