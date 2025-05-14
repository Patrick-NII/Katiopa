import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  Icon,
  Button,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface ExerciseLayoutProps {
  title: string;
  theme: string;
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
}

const ExerciseLayout = ({ title, theme, children, currentStep, totalSteps }: ExerciseLayoutProps) => {
  const router = useRouter();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const breadcrumbColor = useColorModeValue('gray.600', 'gray.400');

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
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => router.push(`/apprentissage/${theme.toLowerCase()}`)} color={breadcrumbColor}>
                {theme}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color={breadcrumbColor}>{title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <VStack spacing={4} align="stretch">
            <Heading size="xl">{title}</Heading>
            {currentStep && totalSteps && (
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text color={breadcrumbColor}>Progression</Text>
                  <Text color={breadcrumbColor}>{currentStep}/{totalSteps}</Text>
                </HStack>
                <Progress
                  value={(currentStep / totalSteps) * 100}
                  size="sm"
                  colorScheme="brand"
                  borderRadius="full"
                />
              </Box>
            )}
          </VStack>

          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p={8}
            borderRadius="xl"
            boxShadow="lg"
          >
            {children}
          </Box>

          <HStack justify="space-between" pt={4}>
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              Retour
            </Button>
            <Button
              colorScheme="brand"
              onClick={() => {/* Navigation vers l'étape suivante */}}
            >
              Continuer
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default ExerciseLayout; 