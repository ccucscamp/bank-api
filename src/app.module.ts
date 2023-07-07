import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChatGateway } from './app.gateway';

@Module({
  imports: [
    PrismaModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'app', 'build'),
    // }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule { }
