import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  const roles = await prisma.role.createManyAndReturn({
    data: [
      {
        name: "ADMIN"
      },
      {
        name: "CONTRIBUTOR"
      },
      {
        name: "USER"
      }
    ],
    skipDuplicates: true
  })

  const scoreTypes = await prisma.scoreType.createManyAndReturn({
    data: [
      {
        name: "REGULAR"
      },
      {
        name: "EXCLUSIVE"
      }
    ],
    skipDuplicates: true
  })

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "galihwicaksono90@gmail.com",
      role: {
        connect: {
          id: roles.find(role => role.name === "ADMIN")?.id
        }
      }
    }
  })

  const contributor = await prisma.user.create({
    data: {
      name: "Contributor",
      email: "gorillahobo@gmail.com",
      role: {
        connect: {
          id: roles.find(role => role.name === "CONTRIBUTOR")?.id
        }
      },
      verifiedAsContributorAt: new Date(),
      verifiedAsContributorBy: {
        connect: {
          id: admin.id
        }
      }
    }
  })

  const regularScore = await prisma.score.create({
    data: {
      type: {
        connect: {
          id: scoreTypes.find(type => type.name === "REGULAR")?.id
        }
      },
      title: "RegularScore",
      author: "Author 1",
      uploadedBy: {
        connect: {
          id: contributor.id
        }
      },
      verifiedAt: new Date(),
      verifiedBy: {
        connect: {
          id: admin.id
        }
      }
    }
  })

  const exclusiveScore = await prisma.score.create({
    data: {
      type: {
        connect: {
          id: scoreTypes.find(type => type.name === "EXCLUSIVE")?.id
        }
      },
      title: "Exclusive Score",
      author: "Author 1",
      uploadedBy: {
        connect: {
          id: contributor.id
        }
      },
      verifiedAt: new Date(),
      verifiedBy: {
        connect: {
          id: admin.id
        }
      }
    }
  })
  console.log({ roles })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
