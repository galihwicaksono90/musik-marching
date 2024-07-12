import { publicProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const { req } = ctx

  const user = req.user
  if (!user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx
    }
  })
})
