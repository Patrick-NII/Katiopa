import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Tag,
  useColorModeValue,
  Card,
  CardBody,
  Icon,
  Button,
  Image,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { FaCalculator, FaGamepad, FaTrophy, FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

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
  },
  {
    id: 'calculation-medium',
    title: 'Jeu de Calcul - Moyen',
    description: 'Teste tes compétences en calcul mental',
    difficulty: 'medium',
    imageUrl: '/images/games/calculation-medium.png',
    type: 'calculation',
  },
  {
    id: 'calculation-hard',
    title: 'Jeu de Calcul - Expert',
    description: 'Le défi ultime en calcul mental',
    difficulty: 'hard',
    imageUrl: '/images/games/calculation-hard.png',
    type: 'calculation',
  },
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

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'green';
    case 'medium':
      return 'yellow';
    case 'hard':
      return 'red';
    default:
      return 'gray';
  }
};

export default function JeuxPage() {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleGameClick = (game: Game) => {
    router.push(`/jeux/${game.id}`);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Jeux de Calcul
        </Heading>
        <Text textAlign="center" fontSize="lg" color="gray.600">
          Amuse-toi en apprenant les mathématiques avec nos jeux interactifs
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {games.map((game) => (
            <MotionBox
              key={game.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                bg={bgColor}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                overflow="hidden"
                cursor="pointer"
                onClick={() => handleGameClick(game)}
                _hover={{
                  shadow: 'lg',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              >
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Box position="relative">
                      <Image
                        src={game.imageUrl}
                        alt={game.title}
                        borderRadius="md"
                        fallback={
                          <Flex
                            h="200px"
                            bg="gray.100"
                            align="center"
                            justify="center"
                          >
                            <Icon as={game.type === 'ludo' ? FaGamepad : FaCalculator} boxSize={12} color="gray.400" />
                          </Flex>
                        }
                      />
                      <Badge
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme={getDifficultyColor(game.difficulty)}
                        fontSize="sm"
                        px={2}
                        py={1}
                        borderRadius="full"
                      >
                        {game.difficulty === 'easy' ? 'Facile' : 
                         game.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                      </Badge>
                    </Box>

                    <VStack align="stretch" spacing={2}>
                      <Heading size="md">{game.title}</Heading>
                      <Text color="gray.600">{game.description}</Text>
                      
                      {game.type === 'ludo' && (
                        <Box mt={2}>
                          <HStack spacing={2} mb={2}>
                            <Badge colorScheme="blue">{game.players} {game.players > 1 ? 'joueurs' : 'joueur'}</Badge>
                            {game.duration && <Badge colorScheme="purple">{game.duration}</Badge>}
                          </HStack>
                          
                          <VStack align="start" spacing={1}>
                            {game.features.map((feature, index) => (
                              <HStack key={index} spacing={2}>
                                <Icon as={FaStar} color="yellow.400" boxSize={3} />
                                <Text fontSize="sm" color="gray.600">{feature}</Text>
                              </HStack>
                            ))}
                          </VStack>
                        </Box>
                      )}
                    </VStack>

                    <Button
                      colorScheme="brand"
                      rightIcon={<FaTrophy />}
                      mt={2}
                    >
                      Jouer
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </MotionBox>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
} 