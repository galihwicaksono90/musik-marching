import { db } from "@repo/db"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

export const purchaseInput = z.object({
  scoreId: z.string(),
  userId: z.string()
})

export async function getPurchaseById({ purchaseId }: { purchaseId: string }) {
  const purchase = await db.purchase.findFirst({
    where: {
      id: purchaseId
    }
  })
  return purchase
}

export async function purchaseScore({ scoreId, userId }: z.infer<typeof purchaseInput>) {
  const score = await db.score.findFirst({
    where: {
      id: scoreId
    }
  })

  if (!score) {
    throw new TRPCError({ code: "BAD_REQUEST" })
  }

  const purchase = await db.purchase.findFirst({
    where: {
      AND: [
        {
          scoreId: scoreId,
        },
        {
          purchasedById: userId
        }
      ]

    }
  })

  if (!!purchase) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "already purchased" })
  }

  return await db.purchase.create({
    data: {
      price: score.price,
      score: {
        connect: {
          id: scoreId
        }
      },
      purchasedBy: {
        connect: {
          id: userId
        }
      }
    }
  })
}

export async function verifyPurchase({ purchaseId, adminId }: { purchaseId: string, adminId: string }) {
  try {
    const purchase = await db.purchase.update({
      where: {
        id: purchaseId
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
    return purchase
  } catch (e) {
    console.log(e)
  }
}
