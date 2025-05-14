import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
  Alert,
  AlertIcon,
  Divider,
  HStack,
  Image,
  Flex,
  Link,
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import NextLink from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  // Si l'utilisateur est déjà connecté, rediriger vers l'espace personnel
  if (status === 'authenticated') {
    router.push('/espace-personnel');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Tentative de connexion avec email:', email);
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/espace-personnel'
      });

      console.log('Résultat de la connexion:', result);

      if (result?.error) {
        console.error('Erreur de connexion:', result.error);
        setError(result.error);
        toast({
          title: 'Erreur de connexion',
          description: result.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.log('Connexion réussie, redirection vers:', '/espace-personnel');
        toast({
          title: 'Connexion réussie',
          description: 'Vous êtes maintenant connecté',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Force le rafraîchissement de la page pour mettre à jour la session
        window.location.href = '/espace-personnel';
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion';
      setError(errorMessage);
      toast({
        title: 'Erreur',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      console.log('Tentative de connexion avec Google');
      
      const result = await signIn('google', { 
        redirect: false,
        callbackUrl: '/espace-personnel'
      });
      
      console.log('Résultat de la connexion Google:', result);
      
      if (result?.error) {
        console.error('Erreur de connexion Google:', result.error);
        toast({
          title: 'Erreur de connexion Google',
          description: result.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (result?.url) {
        console.log('Connexion Google réussie, redirection vers:', result.url);
        router.push(result.url);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion Google:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la connexion avec Google',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8} align="stretch">
        <Flex direction="column" align="center" mb={8}>
          <Image
            src="/images/okapi-logo.png"
            alt="Okapi Logo"
            width="150px"
            mb={4}
          />
          <Heading size="xl" textAlign="center" color="gray.800" _dark={{ color: 'white' }} fontWeight="semibold">
            Bienvenue sur Katiopa
          </Heading>
          <Text color="gray.500" _dark={{ color: 'gray.400' }} textAlign="center" mt={2} fontSize="sm">
            Connectez-vous pour accéder à votre espace
          </Text>
        </Flex>

        {error && (
          <Alert status="error" borderRadius="md" variant="subtle" fontSize="sm">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Box 
          w="100%" 
          as="form" 
          onSubmit={handleSubmit}
          bg="white"
          _dark={{ bg: 'gray.800' }}
          p={8}
          borderRadius="xl"
          boxShadow="sm"
        >
          <Stack spacing={5}>
            <FormControl isRequired>
              <FormLabel color="gray.700" _dark={{ color: 'gray.300' }} fontSize="sm" fontWeight="medium" mb={1.5}>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                size="lg"
                bg="gray.50"
                _dark={{ bg: 'gray.700' }}
                height="44px"
                _hover={{ bg: 'gray.100', _dark: { bg: 'gray.600' } }}
                _focus={{
                  bg: 'white',
                  _dark: { bg: 'gray.600' },
                  boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
                }}
                transition="all 0.2s"
                border="none"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700" _dark={{ color: 'gray.300' }} fontSize="sm" fontWeight="medium" mb={1.5}>Mot de passe</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                size="lg"
                bg="gray.50"
                _dark={{ bg: 'gray.700' }}
                height="44px"
                _hover={{ bg: 'gray.100', _dark: { bg: 'gray.600' } }}
                _focus={{
                  bg: 'white',
                  _dark: { bg: 'gray.600' },
                  boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
                }}
                transition="all 0.2s"
                border="none"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="purple"
              size="md"
              fontSize="sm"
              isLoading={isLoading}
              loadingText="Connexion..."
              w="100%"
              height="40px"
              _hover={{
                transform: 'translateY(-1px)',
                boxShadow: 'sm',
              }}
              transition="all 0.2s"
            >
              Se connecter
            </Button>
          </Stack>
        </Box>

        <HStack w="100%" spacing={4}>
          <Divider />
          <Text color="gray.400" _dark={{ color: 'gray.500' }} fontSize="xs" fontWeight="medium">OU</Text>
          <Divider />
        </HStack>

        <Button
          leftIcon={<FaGoogle />}
          colorScheme="gray"
          size="md"
          fontSize="sm"
          w="100%"
          onClick={handleGoogleSignIn}
          isLoading={isLoading}
          variant="outline"
          height="40px"
          _hover={{
            bg: 'gray.50',
            _dark: { bg: 'gray.700' },
            transform: 'translateY(-1px)',
            boxShadow: 'sm',
          }}
          transition="all 0.2s"
        >
          Continuer avec Google
        </Button>

        <Text textAlign="center" color="gray.500" _dark={{ color: 'gray.400' }} fontSize="sm">
          Pas encore de compte ?{' '}
          <Link as={NextLink} href="/auth/register" color="purple.500">
            Créer un compte
          </Link>
        </Text>
      </VStack>
    </Container>
  );
} 