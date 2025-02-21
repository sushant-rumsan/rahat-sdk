'use client';

import {CONFIG} from '@/lib/config';
import {RumsanProvider, useRumsanAppStore} from '@rumsan/react-query';
import {QueryClient} from '@tanstack/react-query';
import {ApiClient} from '@workspace/sdk/clients/index';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import * as React from 'react';
import {WebSocketProvider} from './websocket.provider';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export const apiClient = new ApiClient({
  baseURL: CONFIG.API_URL,
});

export function Providers({children}: {children: React.ReactNode}) {
  const {isInitialized, initialize} = useRumsanAppStore();

  React.useEffect(() => {
    if (!isInitialized) {
      initialize({
        log: 'App initialized',
      });
    }
  }, [isInitialized, initialize]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <WebSocketProvider url={CONFIG.WS.URL}>
        <RumsanProvider rumsanClient={apiClient} queryClient={queryClient}>
          {children}
        </RumsanProvider>
      </WebSocketProvider>
    </NextThemesProvider>
  );
}
