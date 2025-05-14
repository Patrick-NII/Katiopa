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
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      throw new Error('Tous les champs sont requis');
    }

    if (formData.password !== formData.confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas');
    }

    if (formData.password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Format d\'email invalide');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      validateForm();

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      toast({
        title: 'Inscription réussie',
        description: 'Vous pouvez maintenant vous connecter',
        status: 'success',
        duration: 3000,
      });

      router.push('/auth/login');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(message);
      toast({
        title: 'Erreur',
        description: message,
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
          <Heading size="xl" textAlign="center" color="gray.800" _dark={{ color: 'white' }} fontWeight="semibold">
            Créer votre compte
          </Heading>
          <Text color="gray.500" _dark={{ color: 'gray.400' }} textAlign="center" mt={2} fontSize="sm">
            Rejoignez la communauté Katiopa
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
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel color="gray.700" _dark={{ color: 'gray.300' }} fontSize="sm" fontWeight="medium" mb={1.5}>Prénom</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
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
                <FormLabel color="gray.700" _dark={{ color: 'gray.300' }} fontSize="sm" fontWeight="medium" mb={1.5}>Nom</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
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
            </HStack>

            <FormControl isRequired>
              <FormLabel color="gray.700" _dark={{ color: 'gray.300' }} fontSize="sm" fontWeight="medium" mb={1.5}>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
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
              <FormLabel color="gray.700" _dark={{ color: 'gray.300' }} fontSize="sm" fontWeight="medium" mb={1.5}>Confirmer le mot de passe</FormLabel>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
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
              loadingText="Inscription..."
              w="100%"
              height="40px"
              _hover={{
                transform: 'translateY(-1px)',
                boxShadow: 'sm',
              }}
              transition="all 0.2s"
            >
              Créer mon compte
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
          onClick={() => signIn('google', { callbackUrl: '/' })}
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
          Déjà un compte ?{' '}
          <Link href="/auth/login">
            <Box 
              as="span" 
              color="purple.500" 
              _dark={{ color: 'purple.400' }}
              fontWeight="medium"
              _hover={{ 
                textDecoration: 'underline',
                color: 'purple.600',
                _dark: { color: 'purple.300' }
              }}
            >
              Se connecter
            </Box>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
} 