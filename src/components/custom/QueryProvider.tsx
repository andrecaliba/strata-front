"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const publicRoutes = ["/", "/login"];
      const isPublicRoute = publicRoutes.includes(pathname);

      // If no token and trying to access protected route
      if (!token && !isPublicRoute) {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          router.replace("/");
        }
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Show nothing while checking auth
  if (isChecking || !isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

export default function QueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteGuard>{children}</RouteGuard>
    </QueryClientProvider>
  );
}
