import fastifyCors, { FastifyCorsOptions } from "@fastify/cors"
import { FastifyInstance } from "fastify"

const opts: FastifyCorsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true
}

export function registerCors(app: FastifyInstance) {
  app.register(fastifyCors, opts)
}
