import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SeederModule } from './shared/modules/seeder.module';
import { Seeder } from './database/seeders/seeder';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const context = await NestFactory.createApplicationContext(SeederModule);

  const seeder = await context.get(Seeder);

  await seeder.seed();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ominium API')
    .setDescription('The Ominium API description')
    .setVersion('1.0')
    .addTag('Ominium')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: ['http://localhost:5173'],
  });
  await app.listen(PORT);
}
bootstrap();
