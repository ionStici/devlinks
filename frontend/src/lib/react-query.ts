import { type DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    staleTime: 15 * 60 * 1000, // Data remains fresh for 15 minutes
    retry: false, // Number of times to retry failed queries
    refetchOnWindowFocus: false, // Refetch when window regains focus
    refetchOnReconnect: true, // Refetch on network reconnection
    refetchOnMount: true, // Refetch when component mounts
  },
} satisfies DefaultOptions;
