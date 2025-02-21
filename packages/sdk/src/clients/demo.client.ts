import {formatResponse, FormattedResponse} from '@rumsan/sdk/utils';
import {AxiosInstance, AxiosRequestConfig} from 'axios';

export class DemoClient {
  private _client: AxiosInstance;
  private _prefix = 'demo';

  constructor(apiClient: AxiosInstance) {
    this._client = apiClient;
  }

  async hello(
    config?: AxiosRequestConfig,
  ): Promise<FormattedResponse<Record<string, string>>> {
    const response = await this._client.get(`${this._prefix}/hello`, config);
    return formatResponse<Record<string, string>>(response as any);
  }
}
