import { useRouter } from 'next/router';
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Box,
} from '@chakra-ui/react';
import { FaTimesCircle } from 'react-icons/fa';
import { ROUTES } from '@/config/routes';

export default function SubscriptionCancel() {
  const router = useRouter();

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={8} align="center" textAlign="center">
        <Icon as={FaTimesCircle} w={20} h={20} color="red.500" />
        
        <Heading as="h1" size="2xl">
          Souscription annulée
        </Heading>
        
        <Text fontSize="xl" color="gray.600">
          Vous avez annulé le processus de souscription. Aucun paiement n'a été effectué.
        </Text>

        <Box pt={4}>
          <Button
            colorScheme="green"
            size="lg"
            onClick={() => router.push(ROUTES.SUBSCRIPTION.PLANS)}
            mr={4}
          >
            Revoir les plans
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(ROUTES.HOME)}
          >
            Retour à l'accueil
          </Button>
        </Box>
      </VStack>
    </Container>
  );
} 