import { z } from "zod"
import { RoleNameEnum } from "@repo/db"

export const roleNames = [
  RoleNameEnum.USER,
  RoleNameEnum.ADMIN,
  RoleNameEnum.CONTRIBUTOR
] as const

export const userCreateInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export const verifyAsContributorInput = z.object({
  id: z.string()
})

export type UserCreateInput = z.infer<typeof userCreateInput>
