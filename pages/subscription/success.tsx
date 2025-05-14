import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  useToast,
  Icon,
  Box,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { ROUTES } from '@/config/routes';

export default function SubscriptionSuccess() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const toast = useToast();

  useEffect(() => {
    if (session?.user) {
      // Mettre à jour la session pour refléter le nouvel abonnement
      update();
    }
  }, [session, update]);

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={8} align="center" textAlign="center">
        <Icon as={FaCheckCircle} w={20} h={20} color="green.500" />
        
        <Heading as="h1" size="2xl">
          Merci pour votre souscription !
        </Heading>
        
        <Text fontSize="xl" color="gray.600">
          Votre abonnement a été activé avec succès. Vous avez maintenant accès à toutes les fonctionnalités de votre plan.
        </Text>

        <Box pt={4}>
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => router.push(ROUTES.PERSONAL_SPACE)}
          >
            Accéder à mon espace personnel
          </Button>
        </Box>
      </VStack>
    </Container>
  );
} 