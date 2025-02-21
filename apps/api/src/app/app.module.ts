import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {DemoModule} from 'src/demo/demo.module';
import {ListenerModule} from '../listeners/listener.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {WebSocketService} from './websocket.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    EventEmitterModule.forRoot({
      maxListeners: 10,
      ignoreErrors: false,
    }),
    DemoModule,
    ListenerModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebSocketService],
})
export class AppModule {}
