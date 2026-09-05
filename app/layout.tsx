'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Header/Header';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}