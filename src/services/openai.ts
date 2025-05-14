import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false // L'API key ne doit être utilisée que côté serveur
});

export class OpenAIService {
  static async generateGameSuggestion(topic: string, age: number): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Vous êtes un expert en éducation spécialisé dans la création de jeux éducatifs pour enfants."
          },
          {
            role: "user",
            content: `Suggérez un jeu éducatif sur le thème "${topic}" pour un enfant de ${age} ans. La réponse doit être en français.`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      });

      return completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de suggestion.";
    } catch (error) {
      console.error('Erreur lors de la génération de suggestion:', error);
      throw new Error('Erreur lors de la génération de suggestion de jeu');
    }
  }

  static async generateHint(gameContext: string, currentState: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Vous êtes un assistant pédagogique bienveillant qui aide les enfants à progresser dans leurs jeux éducatifs."
          },
          {
            role: "user",
            content: `Dans le contexte du jeu "${gameContext}", avec l'état actuel "${currentState}", donnez un indice utile mais pas la solution directe.`
          }
        ],
        temperature: 0.5,
        max_tokens: 100
      });

      return completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer d'indice.";
    } catch (error) {
      console.error('Erreur lors de la génération d\'indice:', error);
      throw new Error('Erreur lors de la génération d\'indice');
    }
  }

  static async evaluateAnswer(question: string, userAnswer: string, context: string): Promise<{
    isCorrect: boolean;
    explanation: string;
    suggestion?: string;
  }> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Vous êtes un enseignant expert qui évalue les réponses des élèves de manière constructive."
          },
          {
            role: "user",
            content: `Question: "${question}"\nRéponse de l'élève: "${userAnswer}"\nContexte: "${context}"\nÉvaluez la réponse et donnez une explication pédagogique.`
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      });

      const response = completion.choices[0]?.message?.content || "";
      
      // Analyse simple de la réponse pour déterminer si c'est correct
      const isCorrect = response.toLowerCase().includes('correct') || response.toLowerCase().includes('bonne réponse');

      return {
        isCorrect,
        explanation: response,
        suggestion: isCorrect ? undefined : "Essayez de reformuler votre réponse"
      };
    } catch (error) {
      console.error('Erreur lors de l\'évaluation de la réponse:', error);
      throw new Error('Erreur lors de l\'évaluation de la réponse');
    }
  }

  static async generateQuiz(topic: string, difficulty: 'easy' | 'medium' | 'hard', numberOfQuestions: number): Promise<Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }>> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Vous êtes un créateur de quiz éducatifs. Générez des questions pertinentes et adaptées au niveau demandé."
          },
          {
            role: "user",
            content: `Créez un quiz de ${numberOfQuestions} questions sur "${topic}" de niveau ${difficulty}. Format JSON avec question, options (4 choix), correctAnswer et explanation pour chaque question.`
          }
        ],
        temperature: 0.6,
        max_tokens: 500
      });

      const response = completion.choices[0]?.message?.content || "[]";
      try {
        return JSON.parse(response);
      } catch {
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la génération du quiz:', error);
      throw new Error('Erreur lors de la génération du quiz');
    }
  }
} 