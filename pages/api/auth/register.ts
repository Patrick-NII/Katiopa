import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, firstName, lastName } = req.body;

    // Validation de base
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe avec bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur avec un abonnement gratuit
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name: `${firstName.trim()} ${lastName.trim()}`,
        subscription: {
          create: {
            planId: 'free',
            startDate: new Date(),
            isActive: true,
          },
        },
      },
    });

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    // Mettre à jour les utilisateurs existants qui n'ont pas de nom
    const usersToUpdate = await prisma.user.findMany({
      where: {
        name: { equals: '' },
        OR: [
          { name: { equals: null } }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true
      }
    });

    for (const userToUpdate of usersToUpdate) {
      if (userToUpdate.firstName && userToUpdate.lastName) {
        await prisma.user.update({
          where: { id: userToUpdate.id },
          data: {
            name: `${userToUpdate.firstName} ${userToUpdate.lastName}`
          }
        });
      }
    }

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
} 