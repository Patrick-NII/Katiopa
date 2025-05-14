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
import { FaRocket, FaStar, FaUsers, FaClock } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const gameInfo = {
  title: 'Aventure Spatiale',
  description: "Explorez l'univers dans cette aventure spatiale épique. Apprenez l'astronomie tout en vous amusant !",
  image: '/images/spatial.png',
  rating: 4.8,
  players: 1250,
  duration: '30-45 min',
  difficulty: 'Intermédiaire',
  categories: ['Astronomie', 'Science', 'Aventure'],
};

const achievements = [
  {
    title: 'Premier Vol',
    description: 'Complétez votre premier voyage spatial',
    icon: FaRocket,
  },
  {
    title: 'Explorateur',
    description: 'Découvrez 5 planètes différentes',
    icon: FaStar,
  },
  {
    title: 'Scientifique',
    description: 'Collectez 10 échantillons de roches spatiales',
    icon: FaStar,
  },
];

export default function SpaceAdventure() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Jeux Éducatifs', href: '/games' },
    { label: 'Aventure Spatiale', href: '/games/space-adventure' },
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
              leftIcon={<FaRocket />}
            >
              Jouer Maintenant
            </Button>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
} 