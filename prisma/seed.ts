import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Créer les utilisateurs avec leurs abonnements
  const users = [
    {
      email: 'free@example.com',
      password: 'Free123!',
      firstName: 'Jean',
      lastName: 'Dupont',
      plan: 'free'
    },
    {
      email: 'pro@example.com',
      password: 'Pro123!',
      firstName: 'Marie',
      lastName: 'Martin',
      plan: 'pro'
    },
    {
      email: 'proplus@example.com',
      password: 'ProPlus123!',
      firstName: 'Pierre',
      lastName: 'Durand',
      plan: 'pro_plus'
    }
  ]

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        subscription: {
          create: {
            planId: userData.plan,
            startDate: new Date(),
            isActive: true
          }
        }
      }
    })

    console.log(`Created user: ${user.email} with plan: ${userData.plan}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 