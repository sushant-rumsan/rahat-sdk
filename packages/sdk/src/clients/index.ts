import {RumsanClient} from '@rumsan/sdk/clients';
import {DemoClient} from './demo.client';

export class ApiClient extends RumsanClient {
  constructor(config: any) {
    super(config);
  }

  public get Demo() {
    return new DemoClient(this.apiClient as any);
  }
}
