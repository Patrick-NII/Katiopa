import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

// Vérification détaillée de la clé API
const OPENAI_API_KEY = process.env.OPENAI_API_KEY?.trim();

// Log complet de l'environnement (sans exposer la clé complète)
console.log('\n=== Configuration OpenAI ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Process ENV keys:', Object.keys(process.env));
console.log('API Key status:', {
  isDefined: typeof OPENAI_API_KEY !== 'undefined',
  length: OPENAI_API_KEY?.length,
  prefix: OPENAI_API_KEY?.substring(0, 10) + '...',
  containsQuotes: OPENAI_API_KEY?.includes('"') || OPENAI_API_KEY?.includes("'"),
  isEmpty: OPENAI_API_KEY === '',
  isNull: OPENAI_API_KEY === null,
  isUndefined: OPENAI_API_KEY === undefined,
});

if (!OPENAI_API_KEY) {
  console.error('Erreur: Clé API OpenAI manquante');
  throw new Error('La clé API OpenAI n\'est pas configurée. Veuillez vérifier votre fichier .env.local');
}

let openai: OpenAI;
try {
  openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
  console.log('Client OpenAI initialisé avec succès');
} catch (error) {
  console.error('Erreur lors de l\'initialisation du client OpenAI:', error);
  throw error;
}

// Test de la connexion OpenAI
async function testOpenAIConnection() {
  try {
    const models = await openai.models.list();
    console.log('Connexion OpenAI réussie, modèles disponibles:', models.data.length);
    return true;
  } catch (error) {
    console.error('Erreur lors du test de connexion OpenAI:', error);
    return false;
  }
}

// Mémoire pour les utilisateurs Pro et Pro+
const userMemory = new Map<string, Message[]>();

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('\n=== Nouvelle requête chat ===');
  console.log('Méthode:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!OPENAI_API_KEY) {
    console.error('Clé API manquante lors de la requête');
    return res.status(500).json({
      message: 'Configuration OpenAI manquante',
      details: 'La clé API n\'est pas disponible. Vérifiez le fichier .env.local'
    });
  }

  try {
    const { messages } = req.body;
    console.log('Messages reçus:', JSON.stringify(messages, null, 2));

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: 'Format de messages invalide' });
    }

    try {
      console.log('Tentative d\'appel à OpenAI...');
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `Vous êtes Okapi, l'assistant intelligent de Katiopa. Votre nom est Okapi, comme l'animal rare et unique qui vous inspire.

Votre identité :
- Nom : Okapi
- Rôle : Assistant familial intelligent
- Personnalité : Bienveillant, patient et encourageant
- Langue : Français
- Style : Professionnel mais chaleureux

Votre mission est d'aider les parents et les enfants à :
- Gérer les tâches quotidiennes et les responsabilités
- Suivre les progrès scolaires et les activités
- Organiser les emplois du temps familiaux
- Donner des conseils éducatifs adaptés
- Faciliter la communication entre parents et enfants

Contexte de l'application :
- Katiopa est une plateforme de gestion familiale
- Les utilisateurs peuvent avoir différents niveaux d'abonnement (Free, Pro, Pro+)
- Les fonctionnalités varient selon le niveau d'abonnement
- L'application est disponible en français

Votre personnalité :
- Vous êtes bienveillant, patient et encourageant
- Vous adaptez votre langage à l'âge de l'utilisateur
- Vous restez professionnel tout en étant chaleureux
- Vous encouragez l'autonomie et la responsabilité
- Vous signez toujours vos messages par "Okapi"

Règles importantes :
- Ne jamais donner de conseils médicaux ou juridiques
- Toujours respecter la vie privée des utilisateurs
- Adapter vos réponses au niveau d'abonnement de l'utilisateur
- Encourager les interactions positives entre parents et enfants
- Maintenir un ton positif et constructif
- Toujours vous présenter comme Okapi au début d'une nouvelle conversation

Format de réponse :
- Soyez concis mais complet
- Utilisez des exemples concrets quand c'est possible
- Structurez vos réponses de manière claire
- Proposez des solutions pratiques et réalisables
- Terminez toujours vos messages par "Okapi" pour renforcer votre identité`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      console.log('Réponse OpenAI reçue avec succès');
      const response = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";
      return res.status(200).json({ message: response });
      
    } catch (openaiError: any) {
      console.error('=== Erreur OpenAI détaillée ===');
      console.error('Type:', typeof openaiError);
      console.error('Message:', openaiError.message);
      console.error('Nom:', openaiError.name);
      if (openaiError.response) {
        console.error('Status:', openaiError.response.status);
        console.error('Data:', openaiError.response.data);
      }
      
      // Gestion spécifique de l'erreur de quota
      if (openaiError.status === 429 || openaiError.message?.includes('429') || openaiError.message?.toLowerCase().includes('quota')) {
        return res.status(429).json({
          message: 'Limite de quota atteinte',
          details: 'Vous avez atteint la limite de votre quota OpenAI. Veuillez vérifier votre compte et votre méthode de paiement.',
          action: 'Veuillez vous connecter à votre compte OpenAI pour vérifier votre quota et votre méthode de paiement.'
        });
      }

      // Vérifier si c'est une erreur d'authentification
      if (openaiError.status === 401 || openaiError.message?.includes('401') || openaiError.message?.toLowerCase().includes('authentication')) {
        return res.status(401).json({
          message: 'Erreur d\'authentification OpenAI',
          details: 'Veuillez vérifier votre clé API dans le fichier .env.local'
        });
      }

      return res.status(500).json({ 
        message: 'Erreur lors de la communication avec OpenAI',
        details: openaiError.message || String(openaiError)
      });
    }
  } catch (error: any) {
    console.error('=== Erreur générale ===');
    console.error('Type:', typeof error);
    console.error('Message:', error.message);
    console.error('Nom:', error.name);
    
    return res.status(500).json({ 
      message: 'Une erreur est survenue',
      details: error.message || 'Erreur inconnue'
    });
  }
} 