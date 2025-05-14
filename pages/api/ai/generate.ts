import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIService } from '../../../services/openai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier la session
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { type, params } = req.body;

    switch (type) {
      case 'gameSuggestion':
        const { topic, age } = params;
        const suggestion = await OpenAIService.generateGameSuggestion(topic, age);
        return res.status(200).json({ suggestion });

      case 'hint':
        const { gameContext, currentState } = params;
        const hint = await OpenAIService.generateHint(gameContext, currentState);
        return res.status(200).json({ hint });

      case 'evaluateAnswer':
        const { question, userAnswer, context } = params;
        const evaluation = await OpenAIService.evaluateAnswer(question, userAnswer, context);
        return res.status(200).json(evaluation);

      case 'generateQuiz':
        const { quizTopic, difficulty, numberOfQuestions } = params;
        const quiz = await OpenAIService.generateQuiz(quizTopic, difficulty, numberOfQuestions);
        return res.status(200).json({ quiz });

      default:
        return res.status(400).json({ error: 'Type de génération non supporté' });
    }
  } catch (error) {
    console.error('Erreur API OpenAI:', error);
    return res.status(500).json({ error: 'Erreur lors de la génération du contenu' });
  }
} 