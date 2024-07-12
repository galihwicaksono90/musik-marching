import { initTRPC, TRPCError } from "@trpc/server"
import type { Context } from "./context"
import { UserTypeEnum } from "../../schemas/user"

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const { req, user, res } = ctx

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      user,
      req,
      res,
    }
  })
})

export const contributorProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const { user } = ctx
  if (user?.role !== UserTypeEnum.enum.CONTRIBUTOR) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx
    }
  })
})

export const adminProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const { user } = ctx
  if (user?.role !== UserTypeEnum.enum.ADMIN) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx
    }
  })
})
