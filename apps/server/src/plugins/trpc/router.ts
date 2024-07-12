import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { router } from "./trpc"
import { userRouter } from "../../routers/user"

export const appRouter = router({
  user: userRouter
})

export type AppRouter = typeof appRouter
// export type RouterInput = inferRouterInputs<AppRouter>
// export type RouterOutput = inferRouterOutputs<AppRouter>
