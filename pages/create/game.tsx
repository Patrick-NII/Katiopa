import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaPlus, FaGamepad, FaPuzzlePiece, FaRunning } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const gameTemplates = [
  {
    title: 'Aventure Spatiale',
    description: 'Créez une aventure spatiale interactive avec des énigmes et des défis.',
    icon: FaGamepad,
  },
  {
    title: 'Puzzle Magique',
    description: 'Concevez des puzzles et des énigmes magiques pour stimuler la réflexion.',
    icon: FaPuzzlePiece,
  },
  {
    title: 'Course Extrême',
    description: 'Développez un jeu de course avec des obstacles et des défis.',
    icon: FaRunning,
  },
];

export default function CreateGame() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Créer', href: '/create' },
    { label: 'Nouveau Jeu', href: '/create/game' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Créer un Nouveau Jeu</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Choisissez un modèle ou commencez à partir de zéro
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {gameTemplates.map((template, index) => (
            <Card key={index} bg={bg} borderColor={borderColor} borderWidth="1px">
              <CardBody>
                <VStack spacing={4} align="start">
                  <Icon as={template.icon} w={8} h={8} color="brand.500" />
                  <Heading size="md">{template.title}</Heading>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    {template.description}
                  </Text>
                  <Button
                    leftIcon={<FaPlus />}
                    colorScheme="brand"
                    variant="outline"
                    w="full"
                  >
                    Utiliser ce modèle
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
} 