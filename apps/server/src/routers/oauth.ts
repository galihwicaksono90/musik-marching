import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyPassport from "@fastify/passport"

export function googleOAuth2Routes(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {

  app.get("/google/callback", { preValidation: fastifyPassport.authenticate("googleOAuth2", { scope: ["profile", "email"] }) }, async (req, reply) => {
    reply.redirect("http://localhost:3000")
  })

  done()
}
