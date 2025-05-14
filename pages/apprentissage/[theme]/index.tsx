import { useRouter } from 'next/router';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { themes } from '@/data/learning';
import { ExerciseCard } from '@/components/exercises/ExerciseCard';

const ThemePage = () => {
  const router = useRouter();
  const { theme } = router.query;
  const currentTheme = themes.find(t => t.id === theme);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const breadcrumbColor = useColorModeValue('gray.600', 'gray.400');

  if (!currentTheme) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Thème non trouvé</Text>
      </Container>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Breadcrumb
            spacing="8px"
            separator={<Icon as={FaChevronRight} color={breadcrumbColor} />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => router.push('/')} color={breadcrumbColor}>
                <HStack>
                  <Icon as={FaHome} />
                  <Text>Accueil</Text>
                </HStack>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => router.push('/apprentissage')} color={breadcrumbColor}>
                Apprentissage
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color={breadcrumbColor}>{currentTheme.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <VStack align="start" spacing={2}>
            <HStack>
              <Icon as={currentTheme.icon} w={8} h={8} color={`${currentTheme.color}.500`} />
              <Heading size="xl">{currentTheme.title}</Heading>
            </HStack>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              {currentTheme.description}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {currentTheme.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onClick={() => router.push(`/apprentissage/${theme}/${exercise.id}`)}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default ThemePage; 