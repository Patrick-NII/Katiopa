import { useRouter } from 'next/router';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Email ou mot de passe incorrect.",
  OAuthAccountNotLinked: "Ce compte existe déjà avec un autre moyen de connexion.",
  AccessDenied: "Accès refusé. Veuillez contacter l'administrateur.",
  default: "Une erreur est survenue lors de la connexion ou de l'inscription.",
};

export default function AuthErrorPage() {
  const router = useRouter();
  const { error } = router.query;
  const message = errorMessages[error as string] || errorMessages.default;

  return (
    <Box minH="80vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Heading color="red.500" mb={4}>Erreur d'authentification</Heading>
      <Text mb={6}>{message}</Text>
      <Button as={NextLink} href="/auth/login" colorScheme="purple">
        Retour à la connexion
      </Button>
    </Box>
  );
} 