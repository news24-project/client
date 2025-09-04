"use client";

import { ReactNode, useState } from "react";
import { LanguageProvider } from "./LanguageProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/storeState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>{children}</LanguageProvider>
      </QueryClientProvider>
      <Toaster position="bottom-left"/>
    </Provider>
  );
}
