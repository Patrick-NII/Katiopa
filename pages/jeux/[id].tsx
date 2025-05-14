import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { LudoGame } from '@/components/exercises/LudoGame';
import { CalculationGame } from '@/components/exercises/CalculationGame';
import MathAdventure from '@/components/games/MathAdventure';
import LogiQuest from '@/components/games/LogiQuest';

interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  type: 'ludo' | 'calculation' | 'logique';
  features: string[];
  players: number;
  duration?: string;
}

const games: Game[] = [
  {
    id: 'math-adventure',
    title: 'Math Adventure',
    description: 'Partez à l\'aventure dans un monde magique où les mathématiques sont la clé du succès !',
    difficulty: 'medium',
    imageUrl: '/images/games/9625DC73-C8F8-410D-8959-7CF5CB024B23.webp',
    type: 'calculation',
    features: [
      'Système de progression avec niveaux',
      'Animations et effets visuels',
      'Quatre types d\'opérations',
      'Système de santé et XP',
      'Récompenses et trophées'
    ],
    players: 1,
    duration: 'Illimité',
  },
  {
    id: 'ludo-easy',
    title: 'Ludo Mathématique - Facile',
    description: 'Joue au Ludo en résolvant des additions et soustractions simples',
    difficulty: 'easy',
    imageUrl: '/images/games/ludo-easy.png',
    type: 'ludo',
    features: ['Mode multijoueur (2-4 joueurs)', 'Additions simples', 'Soustractions simples', 'Animations interactives'],
    players: 4,
    duration: '15-30 minutes',
  },
  {
    id: 'ludo-medium',
    title: 'Ludo Mathématique - Moyen',
    description: 'Défie Okapi avec des calculs plus complexes',
    difficulty: 'medium',
    imageUrl: '/images/games/ludo-medium.png',
    type: 'ludo',
    features: ['Mode contre Okapi', 'Calculs intermédiaires', 'Stratégie', 'Système de score'],
    players: 1,
    duration: '20-40 minutes',
  },
  {
    id: 'ludo-hard',
    title: 'Ludo Mathématique - Expert',
    description: 'Le défi ultime contre Okapi',
    difficulty: 'hard',
    imageUrl: '/images/games/ludo-hard.png',
    type: 'ludo',
    features: ['Mode expert contre Okapi', 'Calculs complexes', 'Stratégie avancée', 'Classement'],
    players: 1,
    duration: '30-60 minutes',
  },
  {
    id: 'calculation-easy',
    title: 'Jeu de Calcul - Facile',
    description: 'Résous des opérations simples en un temps limité',
    difficulty: 'easy',
    imageUrl: '/images/games/calculation-easy.png',
    type: 'calculation',
    features: [],
    players: 1,
  },
  {
    id: 'calculation-medium',
    title: 'Jeu de Calcul - Moyen',
    description: 'Teste tes compétences en calcul mental',
    difficulty: 'medium',
    imageUrl: '/images/games/calculation-medium.png',
    type: 'calculation',
    features: [],
    players: 1,
  },
  {
    id: 'calculation-hard',
    title: 'Jeu de Calcul - Expert',
    description: 'Le défi ultime en calcul mental',
    difficulty: 'hard',
    imageUrl: '/images/games/calculation-hard.png',
    type: 'calculation',
    features: [],
    players: 1,
  },
  {
    id: 'logiquest',
    title: 'LogiQuest',
    description: 'Un jeu de logique avancé avec différents types de suites et de motifs',
    difficulty: 'hard',
    imageUrl: '/images/games/771F63D4-CC96-42B8-9FA7-33230F7DC960.webp',
    type: 'logique',
    features: [
      'Suites numériques complexes',
      'Motifs de formes et couleurs',
      'Séquences d\'échecs',
      'Système d\'indices',
      'Progression par niveau'
    ],
    players: 1,
    duration: '10-15 min'
  },
];

export default function GamePage() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState<Game | null>(null);
  const [score, setScore] = useState(0);
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const foundGame = games.find((g) => g.id === id);
      if (foundGame) {
        setGame(foundGame);
      } else {
        router.push('/jeux');
      }
    }
  }, [id, router]);

  const handleGameComplete = (finalScore: number) => {
    setScore(finalScore);
    toast({
      title: 'Partie terminée !',
      description: `Ton score final est de ${finalScore} points`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  if (!id) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center">
          <Heading>Chargement...</Heading>
        </VStack>
      </Container>
    );
  }

  const foundGame = games.find(g => g.id === id);

  if (!foundGame) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center">
          <Heading>Jeu non trouvé</Heading>
          <Text>Le jeu que vous recherchez n'existe pas.</Text>
        </VStack>
      </Container>
    );
  }

  switch (id) {
    case 'math-adventure':
      return <MathAdventure />;
    case 'ludo-easy':
    case 'ludo-medium':
    case 'ludo-hard':
      return <LudoGame difficulty={foundGame.difficulty} onComplete={handleGameComplete} />;
    case 'calculation-easy':
    case 'calculation-medium':
    case 'calculation-hard':
      return <CalculationGame difficulty={foundGame.difficulty} onComplete={handleGameComplete} />;
    case 'logiquest':
      return <LogiQuest onComplete={handleGameComplete} />;
    default:
      return (
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="center">
            <Heading>Jeu non trouvé</Heading>
            <Text>Le jeu que vous recherchez n'existe pas.</Text>
          </VStack>
        </Container>
      );
  }
} 