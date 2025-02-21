import {useWebSocket} from '@/components/providers/websocket.provider';
import {useEffect} from 'react';

export function useWebSocketEvent(
  eventName: string,
  callback: (data: any) => void,
) {
  const {socket} = useWebSocket();

  useEffect(() => {
    if (socket && eventName) {
      socket.on(eventName, callback);

      return () => {
        socket.off(eventName, callback);
      };
    }
  }, [socket, eventName, callback]);
}
