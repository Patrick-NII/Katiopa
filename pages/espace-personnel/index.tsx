import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Stack,
  HStack,
  VStack,
  Avatar,
  Button,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Divider,
  Badge,
  Circle,
  Link as ChakraLink,
  Flex,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { FaGamepad, FaGraduationCap, FaTrophy, FaCalendar, FaChartLine, FaBook, FaCrown, FaRocket, FaStar, FaPlus, FaUser, FaCog, FaUsers } from 'react-icons/fa';
import { ProfilePictureUploader } from '../../components/Profile/ProfilePictureUploader';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

export default function PersonalSpace() {
  const { data: session } = useSession();
  const bgCard = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const statBg = useColorModeValue('brand.50', 'gray.700');
  const badgeBg = useColorModeValue('purple.50', 'purple.900');
  const badgeColor = useColorModeValue('purple.500', 'purple.200');
  const silverBg = useColorModeValue('gray.100', 'gray.700');
  const silverColor = useColorModeValue('gray.600', 'gray.300');

  const stats = [
    {
      label: 'Cours créés',
      value: '12',
      icon: FaBook,
    },
    {
      label: 'Jeux créés',
      value: '5',
      icon: FaGamepad,
    },
    {
      label: 'Élèves actifs',
      value: '45',
      icon: FaUsers,
    },
    {
      label: 'Taux de réussite',
      value: '92%',
      icon: FaChartLine,
    },
  ];

  const achievements = [
    { title: 'Premier jeu créé', description: 'Vous avez créé votre premier jeu', icon: FaGamepad, date: '12/03/2024' },
    { title: 'Expert en mathématiques', description: '100% de réussite en mathématiques', icon: FaGraduationCap, date: '15/03/2024' },
    { title: 'Champion du mois', description: 'Meilleur créateur du mois de Mars', icon: FaTrophy, date: '01/04/2024' },
  ];

  const upcomingEvents = [
    { title: 'Tournoi de Morpion', date: '20/04/2024', type: 'Compétition' },
    { title: 'Atelier Création', date: '25/04/2024', type: 'Formation' },
    { title: 'Challenge Spatial', date: '30/04/2024', type: 'Événement' },
  ];

  const recentProgress = [
    { course: 'Mathématiques Avancées', progress: 85 },
    { course: 'Création de Jeux', progress: 60 },
    { course: 'Programmation Python', progress: 40 },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="lg">Espace Personnel</Heading>
            <Text color="gray.500">Bienvenue, {session?.user?.name}</Text>
          </Box>
          <Button colorScheme="blue" leftIcon={<FaCog />}>
            Paramètres
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          {stats.map((stat, index) => (
            <Card key={index} bg={bgCard} borderColor={borderColor} borderWidth="1px">
              <CardBody>
                <HStack spacing={4}>
                  <Icon as={stat.icon} boxSize={8} color="blue.500" />
                  <Box>
                    <Text fontSize="sm" color="gray.500">{stat.label}</Text>
                    <Text fontSize="2xl" fontWeight="bold">{stat.value}</Text>
                  </Box>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card bg={bgCard} borderColor={borderColor} borderWidth="1px">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Heading size="md">Mes Créations</Heading>
                  <Badge colorScheme="blue">Nouveau</Badge>
                </HStack>
                
                <VStack spacing={4} align="stretch">
                  <Link href={ROUTES.CREATE.COURSE} passHref>
                    <ChakraLink>
                      <Button leftIcon={<FaPlus />} w="full" justifyContent="flex-start">
                        Créer un nouveau cours
                      </Button>
                    </ChakraLink>
                  </Link>
                  
                  <Link href={ROUTES.CREATE.GAME} passHref>
                    <ChakraLink>
                      <Button leftIcon={<FaPlus />} w="full" justifyContent="flex-start">
                        Créer un nouveau jeu
                      </Button>
                    </ChakraLink>
                  </Link>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={bgCard} borderColor={borderColor} borderWidth="1px">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Statistiques</Heading>
                <Text>Vos statistiques détaillées seront disponibles ici.</Text>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  );
} 