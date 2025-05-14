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
} from '@chakra-ui/react';
import { FaComments, FaTrophy, FaCalendar } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import Link from 'next/link';

const sections = [
  {
    title: 'Forum',
    description: 'Échangez avec la communauté et partagez vos expériences',
    icon: FaComments,
    href: '/community/forum',
  },
  {
    title: 'Classement',
    description: 'Découvrez les meilleurs créateurs de la communauté',
    icon: FaTrophy,
    href: '/community/leaderboard',
  },
  {
    title: 'Événements',
    description: 'Participez aux événements de la communauté',
    icon: FaCalendar,
    href: '/community/events',
  },
];

export default function Community() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Communauté', href: '/community' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Communauté</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Rejoignez notre communauté active et participez aux discussions
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {sections.map((section, index) => (
            <Link href={section.href} key={index} style={{ textDecoration: 'none' }}>
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
              >
                <CardBody>
                  <VStack spacing={4} align="start">
                    <Icon as={section.icon} boxSize={8} color="brand.500" />
                    <Heading size="md">{section.title}</Heading>
                    <Text color={useColorModeValue('gray.600', 'gray.400')}>
                      {section.description}
                    </Text>
                    <Button colorScheme="brand" size="sm" mt="auto">
                      Accéder
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