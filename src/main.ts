import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const config = new DocumentBuilder()
    .setTitle('Ominium API')
    .setDescription('The Ominium API description')
    .setVersion('1.0')
    .addTag('Ominium')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(PORT);

}
bootstrap();
