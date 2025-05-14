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
import { FaEdit, FaTrash, FaEye, FaGamepad } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const myCreations = [
  {
    title: 'Mon Aventure Spatiale',
    description: 'Une aventure spatiale interactive avec des énigmes.',
    status: 'En cours',
    lastModified: '2024-04-12',
    icon: FaGamepad,
  },
  {
    title: 'Puzzle Éducatif',
    description: 'Un puzzle pour apprendre les mathématiques.',
    status: 'Publié',
    lastModified: '2024-04-10',
    icon: FaGamepad,
  },
  {
    title: 'Course des Héros',
    description: 'Un jeu de course avec des défis éducatifs.',
    status: 'Brouillon',
    lastModified: '2024-04-08',
    icon: FaGamepad,
  },
];

export default function MyCreations() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Créer', href: '/create' },
    { label: 'Mes Créations', href: '/create/my-creations' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Mes Créations</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Gérez vos jeux et projets créés
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {myCreations.map((creation, index) => (
            <Card key={index} bg={bg} borderColor={borderColor} borderWidth="1px">
              <CardBody>
                <VStack spacing={4} align="start">
                  <HStack justify="space-between" w="full">
                    <Icon as={creation.icon} w={8} h={8} color="brand.500" />
                    <Badge
                      colorScheme={
                        creation.status === 'Publié'
                          ? 'green'
                          : creation.status === 'En cours'
                          ? 'blue'
                          : 'yellow'
                      }
                    >
                      {creation.status}
                    </Badge>
                  </HStack>
                  <Heading size="md">{creation.title}</Heading>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>
                    {creation.description}
                  </Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                    Dernière modification : {creation.lastModified}
                  </Text>
                  <HStack spacing={2} w="full">
                    <Button
                      leftIcon={<FaEdit />}
                      colorScheme="brand"
                      variant="outline"
                      flex={1}
                    >
                      Modifier
                    </Button>
                    <Button
                      leftIcon={<FaEye />}
                      colorScheme="brand"
                      variant="outline"
                      flex={1}
                    >
                      Prévisualiser
                    </Button>
                    <Button
                      leftIcon={<FaTrash />}
                      colorScheme="red"
                      variant="outline"
                    >
                      Supprimer
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
} 