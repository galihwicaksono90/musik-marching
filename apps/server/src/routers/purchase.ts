import { router, protectedProcedure, publicProcedure, adminProcedure } from "../plugins/trpc"
import * as purchaseService from "../services/purchase"
import { z } from "zod"
import { db } from "@repo/db"
import { verifyScore } from "../services/score"
import * as purchaseSchema from "../schemas/purchase"

export const purchaseRouter = router({
  purchaseScore: protectedProcedure
    .input(purchaseSchema.purchaseScoreInput)
    .mutation(async ({ input, ctx }) => {
      const scores = await purchaseService.purchaseScore({
        scoreId: input.scoreId,
        userId: ctx.user.id
      })
      return scores
    }),
  verifyPurchase: adminProcedure
    .input(purchaseSchema.verifyPurchase)
    .mutation(async ({ input, ctx }) => {
      const admin = ctx.user
      purchaseService.verifyPurchase({
        purchaseId: input.purchaseId,
        adminId: admin.id
      })
    })
})  
