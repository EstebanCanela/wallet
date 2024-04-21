import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config/config';
import { join } from 'path';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const confVars = config();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: confVars.grpc.port,
        package: confVars.grpc.package,
        protoPath: join(__dirname, confVars.grpc.path),
      },
    },
  );

  await app.listen();
}

bootstrap();
