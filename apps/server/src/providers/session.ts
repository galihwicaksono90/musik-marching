import fastifySecureSession, { SecureSessionPluginOptions } from "@fastify/secure-session"
import type { FastifyInstance } from "fastify"
import fs from "fs"
import path from "path"

const secureSessionPluginOptions: SecureSessionPluginOptions = {
  key: fs.readFileSync(path.join(__dirname, "../..", "secret-key")),
  cookie: {
    path: "/"
  }
}

export function registerSecureSession(app: FastifyInstance) {
  app.register(fastifySecureSession, secureSessionPluginOptions)
}
