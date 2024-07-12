import fastify from "fastify"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { registerTrpc, appRouter } from "./plugins/trpc"
import { registerCors } from "./plugins/cors"
// import { registerSecureSession } from "./plugins/secureSession"
// import { registerGoogleOAuth2 } from "./plugins/passport"
// import { googleOAuth2Routes } from "./routers/oauth"
// import { appRouter } from "./plugins/trpc/router"

async function createServer() {
  const app = await fastify()

  registerCors(app)
  // registerSecureSession(app)
  // registerGoogleOAuth2(app)
  registerTrpc(app)

  // app.register(googleOAuth2Routes, {
  //   prefix: "/oauth2"
  // })

  return app
}

(async () => {
  const app = await createServer()
  try {
    app.listen({
      port: 4000
    })
  } catch (e) {
    app.close()
    console.error(e)
    process.exit(1)
  }

})()

export type AppRouter = typeof appRouter
// export type RouterInputs = inferRouterInputs<AppRouter>
// export type RouterOutputs = inferRouterOutputs<AppRouter>
