import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "johndoe@example.com",
            avatarUrl: "https://github.com/immathiias.png"
        }
    })

    const poll = await prisma.poll.create({
        data: {
            title: "Example Poll",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-05T16:00:00.917Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-06T19:00:00.917Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
            
            guesses: {
                create: {
                    firstTeamPoints: 3,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_pollId: {
                                userId: user.id,
                                pollId: poll.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()