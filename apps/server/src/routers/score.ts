import { TRPCError } from "@trpc/server"
import { router, protectedProcedure } from "../plugins/trpc"
import { getUserUploadedScores } from "../services/score"

export const scoreRouter = router({
  userUploads: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    const score = getUserUploadedScores(ctx.user.id)
    return score
  }),
})  
