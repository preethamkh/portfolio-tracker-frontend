/**
 * TanStack Query Client Configuration
 *
 * Think of this as configuring EF Core's DbContext options in a .NET application.
 * Sets default behaviors for queries and mutations across the app.
 */

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data stays fresh before refetching (120 minutes)
      staleTime: 120 * 60 * 1000,

      // How long unused data stays in cache (24 hours - because of free API limits :))
      gcTime: 24 * 60 * 60 * 1000,

      // Retry failed requests once
      retry: 1,

      // Don't refetch on window focus by default
      // (we'll enable this selectively for real-time data)
      refetchOnWindowFocus: false,

      // Refetch on mount if data is stale
      refetchOnMount: true,

      // Don't refetch on reconnect by default
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
    },
  },
});
