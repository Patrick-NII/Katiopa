import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Flex,
  Avatar,
  Progress,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import {
  FaPlay,
  FaEdit,
  FaShare,
  FaCopy,
  FaTrash,
  FaPlus,
  FaFilter,
  FaSort,
  FaGamepad,
  FaPuzzlePiece,
  FaBrain,
  FaRobot,
} from 'react-icons/fa';
import { useState } from 'react';

const GameCard = ({ title, description, progress, type, lastEdited }: {
  title: string;
  description: string;
  progress: number;
  type: string;
  lastEdited: string;
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Card bg={cardBg} boxShadow="lg" borderRadius="xl" overflow="hidden" transition="all 0.3s" _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}>
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <Flex justify="space-between" align="center">
            <Badge colorScheme={type === 'Puzzle' ? 'purple' : type === 'Quiz' ? 'blue' : 'green'}>
              {type}
            </Badge>
            <Text fontSize="sm" color={textColor}>
              Modifié le {lastEdited}
            </Text>
          </Flex>
          
          <VStack align="start" spacing={2}>
            <Heading size="md">{title}</Heading>
            <Text color={textColor} noOfLines={2}>
              {description}
            </Text>
          </VStack>

          <Box>
            <Text fontSize="sm" mb={1}>Progression</Text>
            <Progress value={progress} colorScheme="brand" borderRadius="full" />
          </Box>

          <HStack spacing={2}>
            <Tooltip label="Jouer">
              <IconButton
                aria-label="Jouer"
                icon={<FaPlay />}
                colorScheme="brand"
                variant="solid"
              />
            </Tooltip>
            <Tooltip label="Éditer">
              <IconButton
                aria-label="Éditer"
                icon={<FaEdit />}
                variant="outline"
              />
            </Tooltip>
            <Tooltip label="Partager">
              <IconButton
                aria-label="Partager"
                icon={<FaShare />}
                variant="outline"
              />
            </Tooltip>
            <Tooltip label="Dupliquer">
              <IconButton
                aria-label="Dupliquer"
                icon={<FaCopy />}
                variant="outline"
              />
            </Tooltip>
            <Tooltip label="Supprimer">
              <IconButton
                aria-label="Supprimer"
                icon={<FaTrash />}
                colorScheme="red"
                variant="ghost"
              />
            </Tooltip>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const StudioPage = () => {
  const { data: session } = useSession();
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const games = [
    {
      title: "L'Aventure du Code Magique",
      description: "Un jeu de programmation où les joueurs créent des sorts magiques en utilisant des blocs de code.",
      progress: 85,
      type: "Puzzle",
      lastEdited: "2024-03-20"
    },
    {
      title: "Quiz des Sciences",
      description: "Une série de questions passionnantes sur les découvertes scientifiques et les phénomènes naturels.",
      progress: 60,
      type: "Quiz",
      lastEdited: "2024-03-19"
    },
    {
      title: "Math Challenge",
      description: "Des défis mathématiques progressifs adaptés à différents niveaux scolaires.",
      progress: 95,
      type: "Challenge",
      lastEdited: "2024-03-18"
    },
    {
      title: "Le Robot Apprenant",
      description: "Programmez un robot virtuel pour résoudre des énigmes de plus en plus complexes.",
      progress: 40,
      type: "Puzzle",
      lastEdited: "2024-03-17"
    },
    {
      title: "Voyage dans l'Histoire",
      description: "Un quiz interactif sur les grandes périodes de l'histoire mondiale.",
      progress: 75,
      type: "Quiz",
      lastEdited: "2024-03-16"
    },
    {
      title: "Défis Logiques",
      description: "Une collection de puzzles logiques pour développer la pensée critique.",
      progress: 30,
      type: "Challenge",
      lastEdited: "2024-03-15"
    }
  ];

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headerBg = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box bg={headerBg} py={6} px={4} boxShadow="sm" position="sticky" top={0} zIndex={10}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <VStack align="start" spacing={1}>
                <Heading size="lg">Studio de Création</Heading>
                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  Créez et gérez vos jeux éducatifs
                </Text>
              </VStack>
            </GridItem>
            <GridItem display="flex" justifyContent={{ base: 'flex-start', md: 'flex-end' }} alignItems="center">
              <Button
                leftIcon={<FaPlus />}
                colorScheme="brand"
                size="lg"
                onClick={() => {/* Logique pour créer un nouveau jeu */}}
              >
                Nouveau Jeu
              </Button>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Statistiques */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            <Card>
              <CardBody>
                <VStack>
                  <Icon as={FaGamepad} w={8} h={8} color="brand.500" />
                  <Heading size="md">12</Heading>
                  <Text>Jeux Créés</Text>
                </VStack>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <VStack>
                  <Icon as={FaPuzzlePiece} w={8} h={8} color="purple.500" />
                  <Heading size="md">458</Heading>
                  <Text>Parties Jouées</Text>
                </VStack>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <VStack>
                  <Icon as={FaBrain} w={8} h={8} color="blue.500" />
                  <Heading size="md">89%</Heading>
                  <Text>Taux de Réussite</Text>
                </VStack>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <VStack>
                  <Icon as={FaRobot} w={8} h={8} color="green.500" />
                  <Heading size="md">15</Heading>
                  <Text>IA Assistants</Text>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Filtres et tri */}
          <HStack spacing={4} wrap="wrap">
            <Button
              leftIcon={<FaFilter />}
              variant={selectedType === 'all' ? 'solid' : 'outline'}
              onClick={() => setSelectedType('all')}
            >
              Tous
            </Button>
            <Button
              leftIcon={<FaPuzzlePiece />}
              variant={selectedType === 'puzzle' ? 'solid' : 'outline'}
              onClick={() => setSelectedType('puzzle')}
            >
              Puzzles
            </Button>
            <Button
              leftIcon={<FaBrain />}
              variant={selectedType === 'quiz' ? 'solid' : 'outline'}
              onClick={() => setSelectedType('quiz')}
            >
              Quiz
            </Button>
            <Button
              leftIcon={<FaGamepad />}
              variant={selectedType === 'challenge' ? 'solid' : 'outline'}
              onClick={() => setSelectedType('challenge')}
            >
              Challenges
            </Button>
            <Box flex={1} />
            <Button
              leftIcon={<FaSort />}
              variant="outline"
              onClick={() => setSortBy(sortBy === 'recent' ? 'name' : 'recent')}
            >
              {sortBy === 'recent' ? 'Plus récents' : 'Nom'}
            </Button>
          </HStack>

          {/* Liste des jeux */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {games.map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default StudioPage; 