import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function errorHandler(error: unknown, req: NextApiRequest, res: NextApiResponse) {
  console.error('Error details:', error);

  if (error instanceof PrismaClientKnownRequestError) {
    // Gérer les erreurs Prisma
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({
          message: 'Un compte existe déjà avec cet email',
        });
      case 'P2025':
        return res.status(404).json({
          message: 'Ressource non trouvée',
        });
      default:
        return res.status(500).json({
          message: 'Erreur de base de données',
          error: error.message,
        });
    }
  }

  if (error instanceof Error) {
    return res.status(500).json({
      message: 'Une erreur est survenue',
      error: error.message,
    });
  }

  return res.status(500).json({
    message: 'Une erreur inconnue est survenue',
  });
} 