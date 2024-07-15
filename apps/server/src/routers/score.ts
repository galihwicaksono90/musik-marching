import { router, contributorProcedure, publicProcedure, adminProcedure } from "../plugins/trpc"
import * as scoreService from "../services/score"
import * as scoreSchema from "../schemas/score"
import { db } from "@repo/db"
import { TRPCError } from "@trpc/server"

export const scoreRouter = router({
  getAllScores: adminProcedure
    .query(async () => {
      const scores = await scoreService.getScores()
      return scores
    }),
  getVerifiedScores: publicProcedure
    .query(async () => {
      const scores = await scoreService.getVerifiedScores()
      return scores
    }),
  userUploads: contributorProcedure
    .query(async ({ ctx }) => {
      const score = scoreService.getUserUploadedScores(ctx.user.id)
      return score
    }),
  create: contributorProcedure
    .input(scoreSchema.createScoreInput)
    .mutation(async ({ ctx, input }) => {
      console.log({ input })
      const newScore = await scoreService.createOne({
        type: input.type,
        author: input.author,
        title: input.title,
        uploadedById: ctx.user.id
      })

      return newScore
    }),

  getScoreTypes: publicProcedure.query(async () => {
    const scoreTypes = await db.scoreType.findMany()
    return scoreTypes
  }),

  verifyScore: adminProcedure
    .input(scoreSchema.verifyScoreInput)
    .mutation(async ({ input, ctx }) => {
      const score = await scoreService.verifyScore({
        scoreId: input.scoreId,
        adminId: ctx.user.id
      })
      if (!score) {
        throw new TRPCError({ code: "BAD_REQUEST" })
      }
      return score
    })
})  
