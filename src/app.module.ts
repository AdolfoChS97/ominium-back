import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/modules/roles.module';
import { ResourcesModule } from './resources/resources.module';
import { SeederModule } from './shared/modules/seeder.module';
import { PostgresDatabaseProviderModule } from './shared/modules/postgres-database-provider.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log(`Host de la base de datos: ${process.env.DB_HOST}`);
  }
}
