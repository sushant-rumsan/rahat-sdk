import {Module} from '@nestjs/common';
import {WebSocketService} from '../app/websocket.service';
import {DemoListener} from './demo.listeners';

@Module({
  providers: [DemoListener, WebSocketService],
})
export class ListenerModule {}
