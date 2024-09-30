import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolModule } from 'src/rol/rol.module';
import { Rol } from 'src/rol/entities/rol.entity';
import { RolService } from 'src/rol/rol.service';





@Module({
  imports: [
    TypeOrmModule.forFeature([User , Rol ]) , RolModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, RolService ],
  exports: [UsersService],
})
export class UsersModule {}
