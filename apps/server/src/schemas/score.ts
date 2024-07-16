import { z } from "zod"
import { type Prisma } from "@prisma/client"
import { paginationMetaSchema } from "./pagination"

export const sortOptions = ['asc', 'desc'] as const
export const scoreTypes = ["REGULAR", "EXCLUSIVE"] as const

export const scoreTypeEnum = z.enum(scoreTypes)
export const sortOptionsEnum = z.enum(sortOptions)

export const createScoreInput = z.object({
  author: z.string(),
  type: scoreTypeEnum,
  title: z.string(),
})

export const verifyScoreInput = z.object({
  scoreId: z.string(),
})

// export const scorePaginationOptions = z.object({
//   cursor: z.string().optional(),
//   take: z.number().default(1),
//   title: z.string().default(""),
//   orderBy: sortOptionsEnum.default("desc"),
//   type: scoreTypeEnum.optional(),
// })


export const scorePaginationOptions = paginationMetaSchema.extend({
  title: z.string().default(""),
  orderBy: sortOptionsEnum.default("desc"),
  type: scoreTypeEnum.optional(),
})


export type CreateScoreInput = z.infer<typeof createScoreInput>
export type VerifyScoreInput = z.infer<typeof verifyScoreInput>
