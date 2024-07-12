import { z } from "zod"

export const scoreTypes = ["REGULAR", "EXCLUSIVE"] as const

export const ScoreTypeEnum = z.enum(scoreTypes)

export const scoreCreateInput = z.object({
  author: z.string(),
  type: ScoreTypeEnum.default("REGULAR"),
  title: z.string(),
})

export type UserCreateInput = z.infer<typeof scoreCreateInput>
export type ScoreTypeEnum = z.infer<typeof ScoreTypeEnum>
