import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { EventEmitter2 } from '@nestjs/event-emitter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const io = new Server(app.getHttpServer());

  const eventEmitter2 = app.get(EventEmitter2);
  eventEmitter2.on('team_updated', (data) => io.emit('team_updated', data));

  await app.listen(3000);
}
bootstrap();
