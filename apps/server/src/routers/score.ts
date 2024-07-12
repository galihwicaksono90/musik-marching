import { TRPCError } from "@trpc/server"
import { router, protectedProcedure, contributorProcedure } from "../plugins/trpc"
import { getUserUploadedScores, createOne } from "../services/score"
import { scoreCreateInput } from "../schemas/score"

export const scoreRouter = router({
  userUploads: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    const score = getUserUploadedScores(ctx.user.id)
    return score
  }),
  create: protectedProcedure
    .input(scoreCreateInput)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }
      const newScore = await createOne({
        type: input.type.toString(),
        author: input.author,
        title: input.title,
        uploadedBy: {
          connect: {
            id: ctx.user.id
          }
        }
      })

      return newScore
    })
})  
