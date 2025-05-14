import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        subscription: {
          select: {
            planId: true,
            isActive: true,
          }
        }
      }
    });

    console.log('Utilisateurs trouvés:', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers(); 