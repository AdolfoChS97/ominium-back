import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondominiumsModule } from 'src/modules/condominiums/condominiums.module';
import { PermissionsModule } from 'src/modules/permissions/permissions.module';
import { ResourcesModule } from 'src/modules/resources/resources.module';
import { RolesModule } from 'src/modules/roles/modules/roles.module';
import { UsersModule } from 'src/modules/users/users.module';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      synchronize: true,
      autoLoadEntities: true,
    }),
    ResourcesModule,
    PermissionsModule,
    RolesModule,
    UsersModule,
    CondominiumsModule,
  ],
})
export class PostgresDatabaseProviderModule {}
