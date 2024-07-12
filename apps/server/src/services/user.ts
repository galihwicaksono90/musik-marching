import prisma from "../prisma"
import { z } from "zod"

const userCreateInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export type UserCreateInput = z.infer<typeof userCreateInput>

export async function upsertUser({ email, name }: UserCreateInput) {
  const user = await prisma.user.upsert({
    where: {
      email
    },
    update: {
      name
    },
    create: {
      name,
      email
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })

  return user
}

export async function findById({ id }: { id: string }) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })
  return user
}

