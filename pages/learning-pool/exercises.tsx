import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  VStack,
  HStack,
  Icon,
  Badge,
  useColorModeValue,
  Progress,
} from '@chakra-ui/react';
import { FaTasks, FaCheck, FaLock } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const exercises = [
  {
    title: 'Exercices de Programmation',
    description: 'Pratiquez vos compétences en programmation avec des exercices interactifs.',
    progress: 75,
    completed: 15,
    total: 20,
    icon: FaTasks,
  },
  {
    title: 'Problèmes de Mathématiques',
    description: 'Résolvez des problèmes mathématiques de différents niveaux.',
    progress: 30,
    completed: 6,
    total: 20,
    icon: FaTasks,
  },
  {
    title: 'Quiz Scientifiques',
    description: 'Testez vos connaissances en sciences avec des quiz interactifs.',
    progress: 0,
    completed: 0,
    total: 15,
    icon: FaTasks,
  },
];

export default function Exercises() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Espace Apprentissage', href: '/learning-pool' },
    { label: 'Exercices', href: '/learning-pool/exercises' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Exercices</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Améliorez vos compétences avec nos exercices pratiques
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {exercises.map((exercise, index) => (
            <Card
              key={index}
              bg={bg}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="xl"
              overflow="hidden"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              <CardHeader>
                <HStack spacing={4}>
                  <Icon as={exercise.icon} boxSize={6} color="brand.500" />
                  <VStack align="start" spacing={1}>
                    <Heading size="md">{exercise.title}</Heading>
                    <Badge colorScheme={exercise.progress === 100 ? 'green' : exercise.progress > 0 ? 'blue' : 'gray'}>
                      {exercise.progress === 100 ? 'Complété' : exercise.progress > 0 ? 'En cours' : 'Non commencé'}
                    </Badge>
                  </VStack>
                </HStack>
              </CardHeader>
              <CardBody>
                <Box color={useColorModeValue('gray.600', 'gray.400')} mb={4}>
                  {exercise.description}
                </Box>
                <VStack align="start" spacing={2}>
                  <Box fontSize="sm" fontWeight="bold">
                    Progression
                  </Box>
                  <Progress
                    value={exercise.progress}
                    size="sm"
                    colorScheme={exercise.progress === 100 ? 'green' : 'blue'}
                    w="full"
                    borderRadius="full"
                  />
                  <Box fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    {exercise.completed} sur {exercise.total} exercices complétés
                  </Box>
                </VStack>
              </CardBody>
              <CardFooter>
                <Button
                  w="full"
                  colorScheme={exercise.progress === 100 ? 'green' : 'blue'}
                  leftIcon={exercise.progress === 100 ? <FaCheck /> : <FaTasks />}
                >
                  {exercise.progress === 100 ? 'Revoir' : 'Continuer'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
} 