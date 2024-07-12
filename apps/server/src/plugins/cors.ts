import fastifyCors, { FastifyCorsOptions } from "@fastify/cors"
import { FastifyInstance } from "fastify"

const opts: FastifyCorsOptions = {}

export function registerCors(app: FastifyInstance) {
  app.register(fastifyCors, opts)
}
