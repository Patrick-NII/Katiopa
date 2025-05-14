import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  HStack,
  Avatar,
  Badge,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const leaderboardData = [
  {
    rank: 1,
    name: 'Jean Dupont',
    points: 1250,
    gamesCreated: 8,
    avatar: '/avatars/avatar1.jpg',
    badge: 'Créateur Pro',
  },
  {
    rank: 2,
    name: 'Marie Martin',
    points: 980,
    gamesCreated: 6,
    avatar: '/avatars/avatar2.jpg',
    badge: 'Créateur Expérimenté',
  },
  {
    rank: 3,
    name: 'Pierre Durand',
    points: 750,
    gamesCreated: 5,
    avatar: '/avatars/avatar3.jpg',
    badge: 'Créateur Confirmé',
  },
];

export default function Leaderboard() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Communauté', href: '/community' },
    { label: 'Classement', href: '/community/leaderboard' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Classement des Créateurs</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Découvrez les créateurs les plus actifs de notre communauté
          </Text>
        </VStack>

        <Box
          bg={bg}
          borderColor={borderColor}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Rang</Th>
                <Th>Créateur</Th>
                <Th>Points</Th>
                <Th>Jeux Créés</Th>
                <Th>Badge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboardData.map((user) => (
                <Tr key={user.rank}>
                  <Td>
                    <HStack spacing={2}>
                      {user.rank === 1 && <Icon as={FaTrophy} color="yellow.400" />}
                      {user.rank === 2 && <Icon as={FaMedal} color="gray.400" />}
                      {user.rank === 3 && <Icon as={FaAward} color="orange.400" />}
                      <Text fontWeight="bold">{user.rank}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <HStack spacing={3}>
                      <Avatar name={user.name} src={user.avatar} size="sm" />
                      <Text>{user.name}</Text>
                    </HStack>
                  </Td>
                  <Td>{user.points}</Td>
                  <Td>{user.gamesCreated}</Td>
                  <Td>
                    <Badge
                      colorScheme={
                        user.badge === 'Créateur Pro'
                          ? 'purple'
                          : user.badge === 'Créateur Expérimenté'
                          ? 'blue'
                          : 'green'
                      }
                    >
                      {user.badge}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <HStack justify="center" mt={8} spacing={4}>
          <Button colorScheme="brand" variant="outline">
            Voir plus
          </Button>
          <Button colorScheme="brand" variant="solid">
            Partager mon classement
          </Button>
        </HStack>
      </Container>
    </Box>
  );
} 