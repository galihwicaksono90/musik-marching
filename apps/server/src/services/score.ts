import prisma from "../prisma"
import { Prisma } from "@prisma/client"

export function getUserUploadedScores(userId: string) {
  return prisma.score.findMany({
    where: {
      uploadedById: userId
    },
    orderBy: {
      uploadedAt: "desc"
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  })
}

export async function createOne(input: Prisma.ScoreCreateInput) {
  return await prisma.score.create({
    data: {
      ...input
    },
    include: {
      uploadedBy: true
    }
  })
}


