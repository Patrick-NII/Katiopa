import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSubscription() {
  try {
    const email = 'admin@katiopa.com';
    const planId = 'pro_plus';

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      include: { subscription: true },
    });

    if (!user) {
      console.error('Utilisateur non trouvé');
      return;
    }

    // Mettre à jour ou créer la souscription
    const subscription = await prisma.subscription.upsert({
      where: {
        userId: user.id,
      },
      update: {
        planId,
        isActive: true,
        endDate: null,
      },
      create: {
        userId: user.id,
        planId,
        isActive: true,
      },
    });

    console.log('Souscription mise à jour avec succès:', subscription);
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSubscription(); 