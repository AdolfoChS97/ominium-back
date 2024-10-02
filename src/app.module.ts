import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/modules/roles.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { SeederModule } from './shared/modules/seeder.module';
import { PostgresDatabaseProviderModule } from './shared/modules/postgres-database-provider.module';
import { CondominiumsModule } from './modules/condominiums/condominiums.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PostgresDatabaseProviderModule,
    AuthModule,
    RolesModule,
    ResourcesModule,
    SeederModule,
    CondominiumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log(`Host de la base de datos: ${process.env.DB_HOST}`);
  }
}
