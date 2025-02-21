import {useRumsanAppStore} from '@rumsan/react-query';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';

interface WebSocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (event: string, message: any) => void;
  broadcast: (event: string, message: any) => void;
}

type WebSocketContextProvider = {
  url: string | undefined;
  children: ReactNode;
};

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined,
);

export const WebSocketProvider: React.FC<WebSocketContextProvider> = ({
  url,
  children,
}) => {
  const {setClientId} = useRumsanAppStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!url) {
      console.error('WebSocket URL is not defined');
      return;
    }
    // Create a socket connection with the server
    const newSocket = io(url, {
      //query: { apiKey: process.env.API_KEY }, // Pass the API key to authenticate
      transports: ['websocket'],
    });
    setSocket(newSocket);

    // Handle connection
    newSocket.on('connect', () => {
      setIsConnected(true);
      setClientId(newSocket.id as string);
      console.log('Connected to WebSocket server:', newSocket.id);
    });

    // Handle disconnection and attempt reconnection
    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server');
    });

    // Handle unauthorized connection attempts
    newSocket.on('unauthorized', (message) => {
      console.log('Unauthorized connection:', message);
      newSocket.disconnect();
    });

    // Handle welcome message or any other event from the server
    newSocket.on('welcome', (data) => {
      console.log('Welcome message:', data);
    });

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (event: string, message: any) => {
    if (socket) {
      socket.emit(event, message);
    }
  };

  const broadcast = (event: string, message: any) => {
    if (socket) {
      socket.emit(event, message);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{socket, isConnected, sendMessage, broadcast}}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use the WebSocket context
export const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
