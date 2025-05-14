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
import { FaPlus, FaFolder, FaCopy } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import Link from 'next/link';

const sections = [
  {
    title: 'Nouveau Jeu',
    description: 'Créez un nouveau jeu éducatif à partir de zéro',
    icon: FaPlus,
    href: '/create/game',
  },
  {
    title: 'Mes Créations',
    description: 'Gérez et modifiez vos jeux existants',
    icon: FaFolder,
    href: '/create/my-creations',
  },
  {
    title: 'Modèles',
    description: 'Utilisez nos modèles pour créer rapidement',
    icon: FaCopy,
    href: '/create/templates',
  },
];

export default function Create() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Créer', href: '/create' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Créer</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Créez et gérez vos propres jeux éducatifs
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