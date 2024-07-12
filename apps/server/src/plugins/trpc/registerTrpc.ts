import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { appRouter } from "../trpc/router"
import { createContext } from "../trpc/context"
import { FastifyInstance } from "fastify"


export function registerTrpc(app: FastifyInstance) {
  app.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
      router: appRouter,
      createContext
    }
  })
}
