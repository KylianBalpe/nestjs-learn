import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);
  // app.useGlobalFilters(new ValidationFilter());

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 9000;
  await app.listen(PORT);
}

bootstrap();
