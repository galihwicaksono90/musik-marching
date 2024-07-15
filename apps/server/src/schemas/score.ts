import { z } from "zod"

export const scoreTypes = ["REGULAR", "EXCLUSIVE"] as const

export const createScoreInput = z.object({
  author: z.string(),
  type: z.enum(scoreTypes),
  title: z.string(),
})

export const verifyScoreInput = z.object({
  scoreId: z.string(),
})

export type CreateScoreInput = z.infer<typeof createScoreInput>
export type VerifyScoreInput = z.infer<typeof verifyScoreInput>
