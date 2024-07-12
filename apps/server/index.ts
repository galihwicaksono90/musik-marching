import { initTRPC } from "@trpc/server"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import fastify from "fastify"
import fastifyCors from "@fastify/cors"

const t = initTRPC.create()

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return "hello"
  })
})


const createServer = async () => {
  const app = fastify()
  app.register(fastifyCors, {})

  app.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
      router: appRouter,
      createContext: () => {
        return {
          hello: "world"
        }
      }
    }
  })
  return app
}

(async () => {
  const app = await createServer()
  await app.listen({ port: 4000 })
})()

export type AppRouter = typeof appRouter
