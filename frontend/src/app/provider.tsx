import { ToasterConfig } from '@/components/ui/toaster-config';
import { AuthProvider } from '@/lib/auth';
import { MainErrorFallback } from '@/components/errors/main-error-fallback';
import { queryConfig } from '@/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Spinner } from '@/components/ui/spinner';

const queryClient = new QueryClient({ defaultOptions: queryConfig });

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<Spinner />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            <AuthProvider>
              <ToasterConfig />
              {children}
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}
