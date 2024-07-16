import { initTRPC, TRPCError } from "@trpc/server"
import type { Context } from "./context"
import { RoleNameEnum } from "@repo/db"

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

export const contributorProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const { user } = ctx
  if (user.role.name !== RoleNameEnum.CONTRIBUTOR) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx
    }
  })
})

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const { user } = ctx
  console.log({ RoleNameEnum })
  if (user.role.name !== RoleNameEnum.ADMIN) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      ...ctx
    }
  })
})
