import {Injectable} from '@nestjs/common';
import {EventEmitter2} from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  ping() {
    return {
      message: 'PONG',
      serverTime: new Date().toISOString(),
    };
  }
}
