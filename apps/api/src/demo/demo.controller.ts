import {Controller, Get} from '@nestjs/common';
import {xRC} from '@rumsan/extensions/decorators';
import {tRC} from '@rumsan/sdk/types';
import {DemoService} from './demo.service';

@Controller('demo')
export class DemoController {
  constructor(private readonly service: DemoService) {}

  @Get('/hello')
  helloWorld(@xRC() rc: tRC) {
    return this.service.helloWorld(rc);
  }
}
