import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './winston-logger/winston-logger.module';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: winstonLogger });
  app.enableCors({
    origin: [process.env.CLIENT_SIDE_URL],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true 
  })
  await app.listen(4000).then(() => console.log("server running on http://localhost:4000"));
}
bootstrap();
