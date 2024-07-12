import { z } from "zod"

export const UserTypeEnum = z.enum(["USER", "CONTRIBUTOR", "ADMIN"])

export type UserTypeEnum = z.infer<typeof UserTypeEnum>
