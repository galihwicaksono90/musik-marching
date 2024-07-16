import { PrismaClient } from "@prisma/client"
import { pagination } from "prisma-extension-pagination"

const db = new PrismaClient().$extends(pagination())

export { db }
export * from "@prisma/client"
