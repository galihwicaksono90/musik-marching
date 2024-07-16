import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { router } from "./trpc"
import { userRouter } from "../../routers/user"
import { authRouter } from "../../routers/auth"
import { scoreRouter } from "../../routers/score"
import { purchaseRouter } from "../../routers/purchase"

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  score: scoreRouter,
  purchase: purchaseRouter
})

export type AppRouter = typeof appRouter
// export type RouterInput = inferRouterInputs<AppRouter>
// export type RouterOutput = inferRouterOutputs<AppRouter>
