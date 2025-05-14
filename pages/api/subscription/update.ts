import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../../../middleware/errorHandler';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, planId } = req.body;

  try {
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      include: { subscription: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour ou créer la souscription
    const subscription = await prisma.subscription.upsert({
      where: {
        userId: user.id,
      },
      update: {
        planId,
        isActive: true,
        endDate: null, // Plan actif indéfiniment
      },
      create: {
        userId: user.id,
        planId,
        isActive: true,
      },
    });

    return res.status(200).json({
      message: 'Souscription mise à jour avec succès',
      subscription,
    });
  } catch (error) {
    return errorHandler(error, req, res);
  } finally {
    await prisma.$disconnect();
  }
} 