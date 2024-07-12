import { router, publicProcedure } from "../plugins/trpc"

export const userRouter = router({
  testing: publicProcedure.query(async () => {
    return {
      hello: "world",
      mantap: "djaya"
    }
  })
})
