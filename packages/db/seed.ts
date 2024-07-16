import { $Enums, PrismaClient } from "@prisma/client"

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

  const user = await prisma.user.create({
    data: {
      name: "User",
      email: "galih.wicaksono@softwareseni.com",
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

  const scores = [
    {
      title: "Score one",
      author: "Author 1",
      price: 1000,
    },
    {
      title: "Score two",
      author: "Author 2",
      price: 2000,
    },
    {
      title: "Score three",
      author: "Author 3",
      price: 3000,
    },
    {
      title: "Score four",
      author: "Author 4",
      price: 4000,
    },
    {
      title: "Score five",
      author: "Author 5",
      price: 5000,
    },
    {
      title: "Score six",
      author: "Author 6",
      price: 6000,
    },
  ]

  scores.forEach(async (score, index) => {
    const scoreType = index % 2 === 0 ? "REGULAR" : "EXCLUSIVE"
    await prisma.score.create({
      data: {
        type: {
          connect: {
            id: scoreTypes.find(type => type.name === scoreType)?.id
          }
        },
        price: score.price,
        title: score.title,
        author: score.author,
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
  })
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
