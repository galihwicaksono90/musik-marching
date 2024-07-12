import prisma from "../prisma"

export function getUserUploadedScores(userId: string) {
  return prisma.score.findMany({
    where: {
      uploadedById: userId
    },
    orderBy: {
      uploadedAt: "desc"
    }
  })
}
