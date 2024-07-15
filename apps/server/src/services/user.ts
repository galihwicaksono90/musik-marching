import { db, RoleNameEnum, Prisma } from "@repo/db"
import * as userSchema from "../schemas/user"

async function findAllByRole({
  role,
  include
}: { role: RoleNameEnum, include?: Prisma.UserInclude }) {
  const users = await db.user.findMany({
    where: {
      role: {
        name: role
      }
    },
    include,
  })
  return users
}

export async function findContributors() {
  const contributors = await findAllByRole({
    role: "CONTRIBUTOR", include: {
      scores: {
        select: {
          id: true,
          type: true,
          author: true,
          title: true,
        }
      }
    }
  })
  return contributors
}

export async function findUsers() {
  const users = await findAllByRole({ role: "USER" })
  return users
}

export async function upsertUser({ email, name }: userSchema.UserCreateInput) {
  const user = await db.user.upsert({
    where: {
      email
    },
    update: {
      name
    },
    create: {
      name,
      email,
      role: {
        connect: {
          name: RoleNameEnum.USER
        }
      },
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
  const user = await db.user.findFirst({
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

export async function verifyAsContributor({ id, adminId }: { id: string, adminId: string }) {
  try {
    const user = await findById({ id })
    if (user?.role.name !== RoleNameEnum.USER) {
      return null
    }
    const updateUser = await db.user.update({
      where: {
        id,
      },
      data: {
        role: {
          connect: {
            name: RoleNameEnum.CONTRIBUTOR
          }
        },
        verifiedAsContributorAt: new Date(),
        verifiedAsContributorBy: {
          connect: {
            id: adminId
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
    return updateUser
  } catch (e) {
    console.log(e)
    return null
  }
}
