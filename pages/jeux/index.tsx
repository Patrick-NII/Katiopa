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
  Select,
} from '@chakra-ui/react';
import { FaCalculator, FaGamepad, FaTrophy, FaStar, FaUsers } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
    imageUrl: '/katiopa/images/games/ludo-easy.png',
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
    imageUrl: '/katiopa/images/games/ludo-medium.png',
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
    imageUrl: '/katiopa/images/games/ludo-hard.png',
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
    imageUrl: '/katiopa/images/games/calculation-easy.png',
    type: 'calculation',
  },
  {
    id: 'calculation-medium',
    title: 'Jeu de Calcul - Moyen',
    description: 'Teste tes compétences en calcul mental',
    difficulty: 'medium',
    imageUrl: '/katiopa/images/games/calculation-medium.png',
    type: 'calculation',
  },
  {
    id: 'calculation-hard',
    title: 'Jeu de Calcul - Expert',
    description: 'Le défi ultime en calcul mental',
    difficulty: 'hard',
    imageUrl: '/katiopa/images/games/calculation-hard.png',
    type: 'calculation',
  },
  {
    id: 'math-adventure',
    title: 'Math Adventure',
    description: 'Partez à l\'aventure dans un monde magique où les mathématiques sont la clé du succès !',
    difficulty: 'medium',
    imageUrl: '/katiopa/images/games/9625DC73-C8F8-410D-8959-7CF5CB024B23.webp',
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
    imageUrl: '/katiopa/images/games/771F63D4-CC96-42B8-9FA7-33230F7DC960.webp',
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

const categories = [
  { label: 'Tous', value: 'all' },
  { label: 'Mathématiques', value: 'calculation' },
  { label: 'Logique', value: 'logique' },
  { label: 'Ludo', value: 'ludo' },
];
const ageRanges = [
  { label: 'Tous âges', value: '' },
  { label: '5-7 ans', value: '5-7' },
  { label: '8-10 ans', value: '8-10' },
  { label: '11-13 ans', value: '11-13' },
  { label: '14-15 ans', value: '14-15' },
];

export default function JeuxPage() {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('');
  const [parentMode, setParentMode] = useState(false);

  // Ajout d'un mapping âge fictif pour chaque jeu (à adapter selon tes données réelles)
  const gameAges = {
    'ludo-easy': '5-7',
    'ludo-medium': '8-10',
    'ludo-hard': '11-13',
    'calculation-easy': '5-7',
    'calculation-medium': '8-10',
    'calculation-hard': '11-13',
    'math-adventure': '8-15',
    'logiquest': '11-15',
  };

  const filteredGames = games.filter(game => {
    const matchCategory = selectedCategory === 'all' || game.type === selectedCategory;
    const matchAge = !selectedAge || (gameAges[game.id] && gameAges[game.id].includes(selectedAge));
    return matchCategory && matchAge;
  });

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Jeux éducatifs
        </Heading>
        <Text textAlign="center" fontSize="lg" color="gray.600">
          Amuse-toi en apprenant avec nos jeux interactifs adaptés à tous les âges !
        </Text>
        <HStack justify="center" spacing={4} flexWrap="wrap">
          {categories.map(cat => (
            <Button
              key={cat.value}
              colorScheme={selectedCategory === cat.value ? 'brand' : 'gray'}
              variant={selectedCategory === cat.value ? 'solid' : 'outline'}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
          <Select
            placeholder="Filtrer par âge"
            value={selectedAge}
            onChange={e => setSelectedAge(e.target.value)}
            w="180px"
            borderRadius="full"
          >
            {ageRanges.map(age => (
              <option key={age.value} value={age.value}>{age.label}</option>
            ))}
          </Select>
          <Button
            leftIcon={<FaUsers />}
            colorScheme={parentMode ? 'purple' : 'gray'}
            variant={parentMode ? 'solid' : 'outline'}
            onClick={() => setParentMode(m => !m)}
          >
            Mode Parent
          </Button>
        </HStack>
        {parentMode && (
          <Box bg="purple.50" borderRadius="lg" p={6} mb={4}>
            <Heading size="md" mb={2}>Conseils pour les parents</Heading>
            <Text color="purple.800">
              - Suivez la progression de votre enfant et encouragez-le à explorer différents jeux.<br/>
              - Les jeux sont classés par âge et par compétence pour un apprentissage progressif.<br/>
              - Consultez les badges et scores pour valoriser les réussites.<br/>
              - Participez à des défis en famille pour rendre l'apprentissage encore plus ludique !
            </Text>
          </Box>
        )}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredGames.map((game) => (
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
                onClick={() => router.push(`/jeux/${game.id}`)}
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
                      {game.id === 'math-adventure' && (
                        <Badge position="absolute" top={2} left={2} colorScheme="yellow">Populaire</Badge>
                      )}
                      {game.id === 'logiquest' && (
                        <Badge position="absolute" top={2} left={2} colorScheme="green">Nouveau</Badge>
                      )}
                    </Box>
                    <VStack align="stretch" spacing={2}>
                      <Heading size="md">{game.title}</Heading>
                      <Text color="gray.600">{game.description}</Text>
                      <HStack spacing={2} mb={2}>
                        <Badge colorScheme="blue">{game.players} {game.players > 1 ? 'joueurs' : 'joueur'}</Badge>
                        {game.duration && <Badge colorScheme="purple">{game.duration}</Badge>}
                      </HStack>
                      {game.features && (
                        <VStack align="start" spacing={1}>
                          {game.features.map((feature, index) => (
                            <HStack key={index} spacing={2}>
                              <Icon as={FaStar} color="yellow.400" boxSize={3} />
                              <Text fontSize="sm" color="gray.600">{feature}</Text>
                            </HStack>
                          ))}
                        </VStack>
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