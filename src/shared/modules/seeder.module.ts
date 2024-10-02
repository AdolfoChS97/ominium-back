import { Logger, Module } from '@nestjs/common';
import { RolesSeederModule } from 'src/roles/modules/roles.seeder.module';
import { PostgresDatabaseProviderModule } from './postgres-database-provider.module';
import { Seeder } from 'src/database/seeders/seeder';

@Module({
  imports: [PostgresDatabaseProviderModule, RolesSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
