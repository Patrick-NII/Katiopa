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
import { FaBook, FaTasks, FaChartLine } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import Link from 'next/link';

const sections = [
  {
    title: 'Cours',
    description: 'Accédez à nos cours interactifs et enrichissants',
    icon: FaBook,
    href: '/learning-pool/courses',
  },
  {
    title: 'Exercices',
    description: 'Pratiquez avec nos exercices adaptés à votre niveau',
    icon: FaTasks,
    href: '/learning-pool/exercises',
  },
  {
    title: 'Progression',
    description: 'Suivez votre progression et vos accomplissements',
    icon: FaChartLine,
    href: '/learning-pool/progress',
  },
];

export default function LearningPool() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Espace Apprentissage', href: '/learning-pool' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Espace Apprentissage</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Découvrez nos ressources éducatives pour apprendre et progresser
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
                      Explorer
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