import { router, protectedProcedure } from "../plugins/trpc"

export const authRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user
  }),
})
