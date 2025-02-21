import {ApiClient} from '@workspace/sdk/clients/index';

import {useRumsan} from '@rumsan/react-query';
import {useQuery} from '@tanstack/react-query';

export const usePing = () => {
  const {queryClient, RsClient} = useRumsan<ApiClient>();

  return useQuery(
    {
      queryKey: ['ping'],
      queryFn: async () => {
        const {data} = await RsClient.Demo.hello();
        return data;
      },
      enabled: false,
    },
    queryClient,
  );
};
