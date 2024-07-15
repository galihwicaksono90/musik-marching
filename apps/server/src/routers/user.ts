import { router, publicProcedure, adminProcedure } from "../plugins/trpc"
import { verifyAsContributor } from "../services/user"
import * as userSchema from "../schemas/user"
import * as userService from "../services/user"
import { TRPCError } from "@trpc/server"

export const userRouter = router({
  testing: publicProcedure.query(async () => {
    return 'hello world'
  }),
  allUsers: publicProcedure.query(async () => {
    const users = await userService.findUsers()
    return users
  }),

  allContributors: publicProcedure.query(async () => {
    const contributors = await userService.findContributors()
    return contributors
  }),

  verifyAsContributor: adminProcedure
    .input(userSchema.verifyAsContributorInput)
    .mutation(async ({ ctx, input }) => {
      const admin = ctx.user
      const user = await verifyAsContributor({ id: input.id, adminId: admin.id })
      if (!user) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }
      return true
    })
})
