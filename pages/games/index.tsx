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
  useColorModeValue,
  Button,
  Image,
} from '@chakra-ui/react';
import { FaRocket, FaPuzzlePiece, FaRunning } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import Link from 'next/link';

const games = [
  {
    title: 'Aventure Spatiale',
    description: "Explorez l'univers dans cette aventure spatiale épique",
    icon: FaRocket,
    href: '/games/space-adventure',
    image: '/katiopa/images/spatial.png',
  },
  {
    title: 'Puzzle Magique',
    description: 'Résolvez des énigmes magiques dans un monde fantastique',
    icon: FaPuzzlePiece,
    href: '/games/magic-puzzle',
    image: '/katiopa/images/puzzle.png',
  },
  {
    title: 'Course Extrême',
    description: 'Affrontez des défis de course dans des environnements extrêmes',
    icon: FaRunning,
    href: '/games/extreme-race',
    image: '/katiopa/images/cours extreme.jpeg',
  },
];

export default function Games() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Jeux Éducatifs', href: '/games' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Jeux Éducatifs</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Découvrez notre collection de jeux éducatifs interactifs
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {games.map((game, index) => (
            <Link href={game.href} key={index} style={{ textDecoration: 'none' }}>
              <Card
                bg={bg}
                borderColor={borderColor}
                borderWidth="1px"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
                cursor="pointer"
                h="full"
                overflow="hidden"
              >
                <Image
                  src={game.image}
                  alt={game.title}
                  objectFit="cover"
                  h="200px"
                  w="100%"
                />
                <CardBody>
                  <VStack spacing={4} align="start">
                    <Icon as={game.icon} boxSize={8} color="brand.500" />
                    <Heading size="md">{game.title}</Heading>
                    <Text color={useColorModeValue('gray.600', 'gray.400')}>
                      {game.description}
                    </Text>
                    <Button colorScheme="brand" size="sm" mt="auto">
                      Jouer
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
} 