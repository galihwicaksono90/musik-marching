"use client"
import { trpc } from "./trpc"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


export function TRPCReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc"
        })
      ]
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}


