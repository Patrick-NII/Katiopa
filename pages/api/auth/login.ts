import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../../../middleware/errorHandler';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'katiopa-super-secret-key-2024';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let prismaConnection: PrismaClient | null = null;

  try {
    prismaConnection = prisma;
    const { email, password } = req.body;

    console.log('Tentative de connexion pour:', email);

    // Validation de base
    if (!email || !password) {
      console.log('Email ou mot de passe manquant');
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Rechercher l'utilisateur
    const user = await prismaConnection.user.findUnique({
      where: { email },
      include: {
        subscription: true,
        childAccounts: true,
      },
    });

    if (!user) {
      console.log('Utilisateur non trouvé:', email);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('Utilisateur trouvé:', user.email);

    // Vérifier le mot de passe
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      console.log('Mot de passe invalide pour:', email);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('Mot de passe valide pour:', email);

    // Générer le token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        planId: user.subscription?.planId || 'free',
        firstName: user.firstName,
        lastName: user.lastName,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    console.log('Connexion réussie pour:', email);

    return res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Erreur détaillée:', error);
    return errorHandler(error, req, res);
  } finally {
    if (prismaConnection) {
      await prismaConnection.$disconnect();
    }
  }
} 