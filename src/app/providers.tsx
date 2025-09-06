"use client";

import { ReactNode, Suspense, useState } from "react";
import { LanguageProvider } from "./LanguageProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/storeState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <Suspense>{children}</Suspense>
        </LanguageProvider>
      </QueryClientProvider>
    </Provider>
  );
}
