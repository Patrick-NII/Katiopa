import {
  FaCode,
  FaRobot,
  FaCalculator,
  FaFlask,
  FaLanguage,
  FaBrain,
  FaHistory,
  FaGlobe,
} from 'react-icons/fa';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  ageRange: {
    min: number;
    max: number;
  };
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: number; // en minutes
  progress?: number;
  isLocked?: boolean;
  isPro?: boolean;
  route: string;
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  exercises: Exercise[];
}

export const themes: Theme[] = [
  {
    id: 'programmation',
    title: 'Programmation',
    description: 'Découvrez le monde fascinant du code et de la logique',
    icon: FaCode,
    color: 'blue',
    exercises: [
      {
        id: 'bases-programmation-visuelle',
        title: 'Les bases de la programmation visuelle',
        description: 'Apprenez à programmer avec des blocs colorés et intuitifs',
        ageRange: { min: 5, max: 8 },
        difficulty: 1,
        duration: 20,
        progress: 0,
        route: '/apprentissage/programmation/bases-programmation-visuelle',
      },
      {
        id: 'creer-premier-jeu',
        title: 'Créer son premier jeu',
        description: 'Développez un petit jeu interactif étape par étape',
        ageRange: { min: 8, max: 12 },
        difficulty: 2,
        duration: 45,
        progress: 0,
        route: '/apprentissage/programmation/creer-premier-jeu',
      },
      {
        id: 'python-jeunes',
        title: 'Python pour les jeunes',
        description: 'Initiez-vous à Python avec des exemples ludiques',
        ageRange: { min: 12, max: 15 },
        difficulty: 3,
        duration: 60,
        isLocked: true,
        isPro: true,
        route: '/apprentissage/programmation/python-jeunes',
      },
    ],
  },
  {
    id: 'intelligence-artificielle',
    title: 'Intelligence Artificielle',
    description: 'Explorez les mystères de l'IA et du machine learning',
    icon: FaRobot,
    color: 'purple',
    exercises: [
      {
        id: 'introduction-ia',
        title: 'Qu'est-ce que l'IA ?',
        description: 'Une introduction simple et ludique à l'intelligence artificielle',
        ageRange: { min: 8, max: 12 },
        difficulty: 1,
        duration: 30,
        progress: 0,
        route: '/apprentissage/intelligence-artificielle/introduction-ia',
      },
      {
        id: 'premier-modele',
        title: 'Entraîner son premier modèle',
        description: 'Créez un modèle simple de reconnaissance d'images',
        ageRange: { min: 12, max: 15 },
        difficulty: 3,
        duration: 90,
        isLocked: true,
        isPro: true,
        route: '/apprentissage/intelligence-artificielle/premier-modele',
      },
    ],
  },
  {
    id: 'mathematiques',
    title: 'Mathématiques',
    description: 'Maîtrisez les concepts mathématiques essentiels',
    icon: FaCalculator,
    color: 'green',
    exercises: [
      {
        id: 'tables-multiplication',
        title: 'Tables de multiplication en s'amusant',
        description: 'Apprenez les tables de multiplication avec des jeux',
        ageRange: { min: 6, max: 10 },
        difficulty: 2,
        duration: 15,
        progress: 0,
        route: '/apprentissage/mathematiques/tables-multiplication',
      },
      {
        id: 'geometrie-interactive',
        title: 'Géométrie interactive',
        description: 'Découvrez les formes et les angles en 3D',
        ageRange: { min: 8, max: 12 },
        difficulty: 2,
        duration: 40,
        progress: 0,
        route: '/apprentissage/mathematiques/geometrie-interactive',
      },
      {
        id: 'algebre-avancee',
        title: 'Algèbre avancée',
        description: 'Résolvez des équations complexes pas à pas',
        ageRange: { min: 12, max: 15 },
        difficulty: 4,
        duration: 60,
        isLocked: true,
        isPro: true,
        route: '/apprentissage/mathematiques/algebre-avancee',
      },
    ],
  },
  {
    id: 'sciences',
    title: 'Sciences',
    description: 'Explorez les mystères de la nature et de l'univers',
    icon: FaFlask,
    color: 'orange',
    exercises: [
      {
        id: 'systeme-solaire',
        title: 'Le système solaire',
        description: 'Voyage interactif à travers notre système solaire',
        ageRange: { min: 7, max: 12 },
        difficulty: 2,
        duration: 45,
        progress: 0,
        route: '/apprentissage/sciences/systeme-solaire',
      },
      {
        id: 'experiences-virtuelles',
        title: 'Expériences scientifiques virtuelles',
        description: 'Réalisez des expériences en laboratoire virtuel',
        ageRange: { min: 10, max: 15 },
        difficulty: 3,
        duration: 60,
        isLocked: true,
        isPro: true,
        route: '/apprentissage/sciences/experiences-virtuelles',
      },
    ],
  },
]; 