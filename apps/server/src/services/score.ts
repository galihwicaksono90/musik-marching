import { db, ScoreTypeEnum, type Prisma } from "@repo/db"
import { PaginationOptions } from "../schemas/pagination"
import { z } from "zod"

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


export async function getVerifiedScores({ paginationOptions }: { paginationOptions: PaginationOptions<"Score"> }) {
  console.log({ paginationOptions })
  const [pagination, meta] = await db.score.paginate({
    where: {
      ...paginationOptions.where,
      verifiedAt: {
        not: null
      }
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  }).withPages({
    limit: paginationOptions.limit ?? null,
    includePageCount: paginationOptions.includePageCount,
    page: paginationOptions.page
  })
  return { pagination, meta }
}

// export async function getVerifiedScores({ options }: { options?: PaginationOptions<"Score"> }) {
//   return await db.score.findMany({
//     take: options?.take,
//     skip: options?.skip,
//     where: {
//       ...options?.where,
//       verifiedAt: {
//         not: null
//       },
//     },
//     orderBy: {
//       ...options?.orderBy
//     },
//     // cursor: options?.cursor,
//     include: {
//       uploadedBy: {
//         select: {
//           id: true,
//           name: true,
//         }
//       },
//       type: true
//     },
//   })
// }

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

