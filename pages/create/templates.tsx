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
  HStack,
  Badge,
} from '@chakra-ui/react';
import { FaGamepad, FaPuzzlePiece, FaRunning, FaPlus } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const templates = [
  {
    title: 'Aventure Spatiale',
    description: 'Créez une aventure spatiale interactive avec des énigmes et des défis.',
    category: 'Aventure',
    difficulty: 'Facile',
    icon: FaGamepad,
  },
  {
    title: 'Puzzle Magique',
    description: 'Concevez des puzzles et des énigmes magiques pour stimuler la réflexion.',
    category: 'Puzzle',
    difficulty: 'Moyen',
    icon: FaPuzzlePiece,
  },
  {
    title: 'Course Extrême',
    description: 'Développez un jeu de course avec des obstacles et des défis.',
    category: 'Action',
    difficulty: 'Difficile',
    icon: FaRunning,
  },
];

export default function Templates() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Créer', href: '/create' },
    { label: 'Modèles', href: '/create/templates' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Modèles de Jeux</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Choisissez parmi nos modèles prédéfinis pour créer rapidement votre jeu
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {templates.map((template, index) => (
            <Card key={index} bg={bg} borderColor={borderColor} borderWidth="1px">
              <CardBody>
                <VStack spacing={4} align="start">
                  <HStack justify="space-between" w="full">
                    <Icon as={template.icon} w={8} h={8} color="brand.500" />
                    <HStack spacing={2}>
                      <Badge colorScheme="purple">{template.category}</Badge>
                      <Badge
                        colorScheme={
                          template.difficulty === 'Facile'
                            ? 'green'
                            : template.difficulty === 'Moyen'
                            ? 'yellow'
                            : 'red'
                        }
                      >
                        {template.difficulty}
                      </Badge>
                    </HStack>
                  </HStack>
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