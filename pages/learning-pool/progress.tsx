import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Progress as ChakraProgress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaChartLine, FaTrophy, FaBook, FaTasks } from 'react-icons/fa';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

const stats = [
  {
    label: 'Cours Complétés',
    value: '12',
    change: '+3',
    icon: FaBook,
  },
  {
    label: 'Exercices Résolus',
    value: '45',
    change: '+8',
    icon: FaTasks,
  },
  {
    label: 'Points Gagnés',
    value: '1,250',
    change: '+150',
    icon: FaTrophy,
  },
];

const progressData = [
  {
    subject: 'Programmation',
    progress: 75,
    target: 100,
  },
  {
    subject: 'Mathématiques',
    progress: 60,
    target: 100,
  },
  {
    subject: 'Sciences',
    progress: 45,
    target: 100,
  },
];

export default function ProgressPage() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Espace Apprentissage', href: '/learning-pool' },
    { label: 'Progression', href: '/learning-pool/progress' },
  ];

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <Breadcrumb items={breadcrumbItems} />
        <VStack spacing={8} align="start" mb={8}>
          <Heading size="xl">Ma Progression</Heading>
          <Box fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Suivez votre progression et vos réalisations
          </Box>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          {stats.map((stat, index) => (
            <Card
              key={index}
              bg={bg}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="xl"
            >
              <CardHeader>
                <HStack spacing={4}>
                  <Icon as={stat.icon} boxSize={6} color="brand.500" />
                  <VStack align="start" spacing={1}>
                    <Stat>
                      <StatLabel>{stat.label}</StatLabel>
                      <StatNumber>{stat.value}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {stat.change} cette semaine
                      </StatHelpText>
                    </Stat>
                  </VStack>
                </HStack>
              </CardHeader>
            </Card>
          ))}
        </SimpleGrid>

        <VStack spacing={6} align="start">
          <Heading size="md">Progression par Matière</Heading>
          {progressData.map((item, index) => (
            <Box key={index} w="full">
              <HStack justify="space-between" mb={2}>
                <Box fontWeight="bold">{item.subject}</Box>
                <Box color={useColorModeValue('gray.600', 'gray.400')}>
                  {item.progress}%
                </Box>
              </HStack>
              <ChakraProgress
                value={item.progress}
                size="lg"
                colorScheme="blue"
                borderRadius="full"
              />
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
} 