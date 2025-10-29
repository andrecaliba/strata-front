"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

// For TanStack DevTools =======================================
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;
// =============================================================

export default function QueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           staleTime: 60 * 1000,
  //           refetchOnWindowFocus: false,
  //           retry: 1,
  //         },
  //         mutations: {
  //           retry: 1,
  //         },
  //       },
  //     })
  // );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
