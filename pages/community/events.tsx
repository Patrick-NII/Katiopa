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
  Avatar,
} from '@chakra-ui/react';
import { FaCalendar, FaUsers, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const events = [
  {
    title: 'Atelier de Création de Jeux',
    date: '2024-04-15',
    time: '14:00 - 16:00',
    location: 'Paris, France',
    participants: 25,
    organizer: 'Jean Dupont',
    avatar: '/avatars/avatar1.jpg',
    status: 'À venir',
  },
  {
    title: 'Conférence sur les Jeux Éducatifs',
    date: '2024-04-20',
    time: '18:00 - 20:00',
    location: 'En ligne',
    participants: 50,
    organizer: 'Marie Martin',
    avatar: '/avatars/avatar2.jpg',
    status: 'À venir',
  },
  {
    title: 'Tournoi de Jeux Créés',
    date: '2024-04-25',
    time: '10:00 - 18:00',
    location: 'Lyon, France',
    participants: 15,
    organizer: 'Pierre Durand',
    avatar: '/avatars/avatar3.jpg',
    status: 'À venir',
  },
];

export default function Events() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Communauté', href: '/community' },
    { label: 'Événements', href: '/community/events' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Événements de la Communauté</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Découvrez et participez aux événements organisés par notre communauté
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {events.map((event, index) => (
            <Card key={index} bg={bg} borderColor={borderColor} borderWidth="1px">
              <CardBody>
                <VStack spacing={4} align="start">
                  <HStack justify="space-between" w="full">
                    <Badge
                      colorScheme={
                        event.status === 'À venir'
                          ? 'green'
                          : event.status === 'En cours'
                          ? 'blue'
                          : 'red'
                      }
                    >
                      {event.status}
                    </Badge>
                    <HStack spacing={2}>
                      <Icon as={FaUsers} />
                      <Text>{event.participants} participants</Text>
                    </HStack>
                  </HStack>
                  <Heading size="md">{event.title}</Heading>
                  <VStack align="start" spacing={2}>
                    <HStack spacing={2}>
                      <Icon as={FaCalendar} />
                      <Text>{event.date}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaClock} />
                      <Text>{event.time}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaMapMarkerAlt} />
                      <Text>{event.location}</Text>
                    </HStack>
                  </VStack>
                  <HStack spacing={3} w="full" justify="space-between">
                    <HStack spacing={2}>
                      <Avatar name={event.organizer} src={event.avatar} size="sm" />
                      <Text fontSize="sm">Organisé par {event.organizer}</Text>
                    </HStack>
                    <Button colorScheme="brand" size="sm">
                      Participer
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