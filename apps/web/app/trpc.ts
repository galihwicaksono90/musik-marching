import { createTRPCReact } from "@trpc/react-query"

import { AppRouter } from "@repo/server"

export const trpc = createTRPCReact<AppRouter>()
