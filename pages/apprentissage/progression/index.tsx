import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import { FaChartLine, FaTrophy, FaStar, FaBook, FaClock } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ProgressData {
  course: string;
  completion: number;
  lastPlayed: string;
  streak: number;
  score: number;
}

const mockProgressData: ProgressData[] = [
  {
    course: 'Calcul Mental',
    completion: 75,
    lastPlayed: '2024-03-20',
    streak: 5,
    score: 850,
  },
  {
    course: 'Géométrie',
    completion: 60,
    lastPlayed: '2024-03-19',
    streak: 3,
    score: 650,
  },
  {
    course: 'Algèbre',
    completion: 40,
    lastPlayed: '2024-03-18',
    streak: 2,
    score: 450,
  },
];

export default function ProgressPage() {
  const { data: session } = useSession();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl" textAlign="center">
          Ma Progression
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
          <StatCard
            title="Score Total"
            value="1950"
            icon={FaTrophy}
            change="+15%"
            isIncrease
          />
          <StatCard
            title="Temps d'Apprentissage"
            value="12h 30m"
            icon={FaClock}
            change="+20%"
            isIncrease
          />
          <StatCard
            title="Cours Complétés"
            value="8"
            icon={FaBook}
            change="+2"
            isIncrease
          />
          <StatCard
            title="Série Actuelle"
            value="5"
            icon={FaStar}
            change="+3"
            isIncrease
          />
        </SimpleGrid>

        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Mes Cours</Tab>
            <Tab>Statistiques</Tab>
            <Tab>Récompenses</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                {mockProgressData.map((course, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <HStack justify="space-between">
                            <Heading size="md">{course.course}</Heading>
                            <Badge colorScheme="green">
                              {course.completion}% complété
                            </Badge>
                          </HStack>
                          <Progress
                            value={course.completion}
                            colorScheme="brand"
                            size="sm"
                            borderRadius="full"
                          />
                          <HStack justify="space-between">
                            <HStack>
                              <Icon as={FaStar} color="yellow.500" />
                              <Text>Score: {course.score}</Text>
                            </HStack>
                            <HStack>
                              <Icon as={FaChartLine} />
                              <Text>Série: {course.streak}</Text>
                            </HStack>
                            <Text color="gray.500">
                              Dernière session: {course.lastPlayed}
                            </Text>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </MotionBox>
                ))}
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Évolution du Score</Heading>
                {/* Graphique d'évolution à implémenter */}
                <Box h="300px" bg="gray.100" borderRadius="md">
                  {/* Placeholder pour le graphique */}
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Mes Récompenses</Heading>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  {/* Badges et récompenses à implémenter */}
                </SimpleGrid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: any;
  change: string;
  isIncrease: boolean;
}

function StatCard({ title, value, icon, change, isIncrease }: StatCardProps) {
  return (
    <Card>
      <CardBody>
        <Stat>
          <HStack>
            <Icon as={icon} boxSize={6} color="brand.500" />
            <StatLabel>{title}</StatLabel>
          </HStack>
          <StatNumber>{value}</StatNumber>
          <StatHelpText>
            <StatArrow type={isIncrease ? 'increase' : 'decrease'} />
            {change}
          </StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  );
} 