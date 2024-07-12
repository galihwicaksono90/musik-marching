import { router, publicProcedure } from "../plugins/trpc"
import prisma from "../prisma"

export const userRouter = router({
  all: publicProcedure.query(async () => {
    const users = await prisma.user.findMany()
    return users
  }),
  embuh: publicProcedure.query(async () => {
    return {
      hello: "world",
      mantap: "djaya"
    }
  })
})
