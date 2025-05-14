import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useColorModeValue,
  Icon,
  Badge,
} from '@chakra-ui/react';
import { FaPuzzlePiece, FaStar, FaUsers, FaClock } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const gameInfo = {
  title: 'Puzzle Magique',
  description: 'Résolvez des énigmes magiques dans un monde fantastique. Développez votre logique et votre créativité !',
  image: '/images/puzzle.png',
  rating: 4.9,
  players: 980,
  duration: '20-30 min',
  difficulty: 'Facile',
  categories: ['Logique', 'Créativité', 'Fantaisie'],
};

const achievements = [
  {
    title: 'Premier Puzzle',
    description: 'Résolvez votre premier puzzle magique',
    icon: FaPuzzlePiece,
  },
  {
    title: 'Maître des Énigmes',
    description: 'Résolvez 10 puzzles consécutifs',
    icon: FaStar,
  },
  {
    title: 'Créateur',
    description: 'Créez votre propre puzzle',
    icon: FaPuzzlePiece,
  },
];

export default function MagicPuzzle() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Jeux Éducatifs', href: '/games' },
    { label: 'Puzzle Magique', href: '/games/magic-puzzle' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">{gameInfo.title}</Heading>
          <Box fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            {gameInfo.description}
          </Box>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <Image
              src={gameInfo.image}
              alt={gameInfo.title}
              borderRadius="xl"
              boxShadow="lg"
            />
            <HStack spacing={4} mt={4}>
              <Badge colorScheme="green" fontSize="sm">
                {gameInfo.rating} ★
              </Badge>
              <HStack spacing={2}>
                <Icon as={FaUsers} />
                <Box>{gameInfo.players} joueurs</Box>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaClock} />
                <Box>{gameInfo.duration}</Box>
              </HStack>
            </HStack>
          </Box>

          <VStack spacing={6} align="start">
            <Heading size="md">Détails du Jeu</Heading>
            <Box>
              <strong>Difficulté :</strong> {gameInfo.difficulty}
            </Box>
            <Box>
              <strong>Catégories :</strong> {gameInfo.categories.join(', ')}
            </Box>

            <Heading size="md" mt={4}>
              Réalisations
            </Heading>
            <SimpleGrid columns={1} spacing={4} w="full">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  bg={bg}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="xl"
                >
                  <CardHeader>
                    <HStack spacing={4}>
                      <Icon as={achievement.icon} boxSize={6} color="brand.500" />
                      <VStack align="start" spacing={1}>
                        <Heading size="sm">{achievement.title}</Heading>
                        <Box fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                          {achievement.description}
                        </Box>
                      </VStack>
                    </HStack>
                  </CardHeader>
                </Card>
              ))}
            </SimpleGrid>

            <Button
              colorScheme="blue"
              size="lg"
              w="full"
              mt={4}
              leftIcon={<FaPuzzlePiece />}
            >
              Jouer Maintenant
            </Button>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
} 