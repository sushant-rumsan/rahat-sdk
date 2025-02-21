'use client';

import {useWebSocketEvent} from '@/hooks/ws-event.hook';
import {usePing} from '@/queries/demo.query';
import {Alert, AlertDescription} from '@rumsan/shadcn-ui/components/alert';
import {Button} from '@rumsan/shadcn-ui/components/button';
import {EVENTS} from '@workspace/sdk/constants/events';

import {useState} from 'react';

export default function Page() {
  const [wsResponse, setWsResponse] = useState();
  const {data, refetch, isFetching} = usePing();
  useWebSocketEvent(EVENTS.DEMO.PONG, (data) => {
    setWsResponse(data);
  });
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Rumsan Seed Demo</h1>
        <Button size="sm" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Pinging...' : 'Ping Server'}
        </Button>
        <Alert variant="default">
          <AlertDescription>
            <pre>{data && <p>{JSON.stringify(data)}</p>}</pre>
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertDescription>
            <pre>{wsResponse && <p>{JSON.stringify(wsResponse)}</p>}</pre>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
