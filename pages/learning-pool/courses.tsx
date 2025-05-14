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
} from '@chakra-ui/react';
import { FaBook, FaClock, FaUserGraduate } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const courses = [
  {
    title: 'Introduction à la Programmation',
    description: 'Apprenez les bases de la programmation avec des exercices interactifs.',
    duration: '2 heures',
    students: 120,
    level: 'Débutant',
    icon: FaBook,
  },
  {
    title: 'Mathématiques Avancées',
    description: 'Découvrez les concepts avancés des mathématiques modernes.',
    duration: '4 heures',
    students: 85,
    level: 'Avancé',
    icon: FaBook,
  },
  {
    title: 'Sciences Naturelles',
    description: 'Explorez les merveilles de la nature et des sciences.',
    duration: '3 heures',
    students: 150,
    level: 'Intermédiaire',
    icon: FaBook,
  },
];

export default function Courses() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Espace Apprentissage', href: '/learning-pool' },
    { label: 'Cours', href: '/learning-pool/courses' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Nos Cours</Heading>
          <Box fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Découvrez notre sélection de cours interactifs
          </Box>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {courses.map((course, index) => (
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
                  <Icon as={course.icon} boxSize={6} color="brand.500" />
                  <VStack align="start" spacing={1}>
                    <Heading size="md">{course.title}</Heading>
                    <Badge colorScheme={course.level === 'Débutant' ? 'green' : course.level === 'Intermédiaire' ? 'yellow' : 'red'}>
                      {course.level}
                    </Badge>
                  </VStack>
                </HStack>
              </CardHeader>
              <CardBody>
                <Box fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  {course.description}
                </Box>
              </CardBody>
              <CardFooter>
                <HStack spacing={4} w="full" justify="space-between">
                  <HStack spacing={2}>
                    <Icon as={FaClock} />
                    <Box fontSize="sm">{course.duration}</Box>
                  </HStack>
                  <HStack spacing={2}>
                    <Icon as={FaUserGraduate} />
                    <Box fontSize="sm">{course.students} étudiants</Box>
                  </HStack>
                </HStack>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
} 