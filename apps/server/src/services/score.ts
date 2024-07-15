import { db, ScoreTypeEnum, type Prisma } from "@repo/db"
import { createConnection } from "net"

export function getScores() {
  return db.score.findMany({
    orderBy: {
      uploadedAt: "desc"
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
        }
      },
      type: true
    },
  })
}

export function getVerifiedScores() {
  return db.score.findMany({
    where: {
      verifiedAt: {
        not: null
      },
      title: {
        contains: ""
      }
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
      },
      type: true
    },
  })
}

export function getUserUploadedScores(userId: string) {
  return db.score.findMany({
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

export async function createOne({
  author,
  type,
  title,
  uploadedById
}: {
  author: string,
  type: ScoreTypeEnum,
  title: string,
  uploadedById: string
}) {
  return await db.score.create({
    data: {
      type: {
        connect: {
          name: type
        }
      },
      title: title,
      author: author,
      uploadedBy: {
        connect: {
          id: uploadedById
        }
      },
    },
    include: {
      uploadedBy: true
    }
  })
}

export async function verifyScore({ scoreId, adminId }: { scoreId: string, adminId: string }) {
  try {
    const score = db.score.update({
      where: {
        id: scoreId
      },
      data: {
        verifiedAt: new Date(),
        verifiedBy: {
          connect: {
            id: adminId
          }
        }
      }
    })
    return score
  } catch (e) {
    console.log(e)
    return null
  }

}

