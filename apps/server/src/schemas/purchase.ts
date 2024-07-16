import { z } from "zod"

export const verifyPurchase = z.object({
  purchaseId: z.string(),
})

export const purchaseScoreInput = z.object({
  scoreId: z.string()
})

