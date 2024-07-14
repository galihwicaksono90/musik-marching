import { router, publicProcedure } from "../plugins/trpc"
import { prisma } from "@repo/db"

export const userRouter = router({
  all: publicProcedure.query(async () => {
    const users = await prisma.user.findMany()
    return users
  }),
})
