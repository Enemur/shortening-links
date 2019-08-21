import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ConfigService} from "./service/config.service";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  const { basePath, port, isSwaggerEnabled } = configService;

  app.setGlobalPrefix(basePath);

  if (isSwaggerEnabled) {
    const options = new DocumentBuilder()
      .setTitle('Nest API')
      .setDescription('API description')
      .setBasePath(basePath)
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${basePath}/docs`, app, document);
  }

  await app.listen(port || 4000, '0.0.0.0');

}

bootstrap();
