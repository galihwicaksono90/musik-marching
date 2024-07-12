import fastifySecureSession, { SecureSessionPluginOptions } from "@fastify/secure-session"

const options: SecureSessionPluginOptions = {
  key: Buffer.from(process.env.SESSION_SECRET as string, "hex"),
  // key: process.env.SESSION_SECRET as string,
  cookie: {
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month
  }
}

export function registerSecureSession(app: any) {
  app.register(fastifySecureSession, options)
}
