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
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaSearch, FaComments, FaThumbsUp, FaReply } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const forumTopics = [
  {
    title: 'Comment créer un jeu éducatif ?',
    author: 'Jean Dupont',
    replies: 12,
    likes: 45,
    lastActivity: '2024-04-12',
    avatar: '/avatars/avatar1.jpg',
  },
  {
    title: 'Partagez vos expériences avec les jeux',
    author: 'Marie Martin',
    replies: 8,
    likes: 32,
    lastActivity: '2024-04-11',
    avatar: '/avatars/avatar2.jpg',
  },
  {
    title: 'Astuces pour rendre les jeux plus engageants',
    author: 'Pierre Durand',
    replies: 15,
    likes: 67,
    lastActivity: '2024-04-10',
    avatar: '/avatars/avatar3.jpg',
  },
];

export default function Forum() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Communauté', href: '/community' },
    { label: 'Forum', href: '/community/forum' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Forum de la Communauté</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Échangez avec d'autres créateurs et partagez vos expériences
          </Text>
        </VStack>

        <InputGroup mb={8}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Rechercher dans le forum..."
            bg={bg}
            borderColor={borderColor}
          />
        </InputGroup>

        <SimpleGrid columns={{ base: 1 }} spacing={6}>
          {forumTopics.map((topic, index) => (
            <Card key={index} bg={bg} borderColor={borderColor} borderWidth="1px">
              <CardBody>
                <VStack spacing={4} align="start">
                  <HStack justify="space-between" w="full">
                    <HStack spacing={4}>
                      <Avatar name={topic.author} src={topic.avatar} />
                      <VStack align="start" spacing={0}>
                        <Heading size="md">{topic.title}</Heading>
                        <Text color={useColorModeValue('gray.600', 'gray.400')}>
                          Par {topic.author}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      Dernière activité : {topic.lastActivity}
                    </Text>
                  </HStack>
                  <HStack spacing={4}>
                    <HStack spacing={2}>
                      <Icon as={FaComments} />
                      <Text>{topic.replies} réponses</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaThumbsUp} />
                      <Text>{topic.likes} j'aime</Text>
                    </HStack>
                  </HStack>
                  <Button
                    leftIcon={<FaReply />}
                    colorScheme="brand"
                    variant="outline"
                  >
                    Répondre
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