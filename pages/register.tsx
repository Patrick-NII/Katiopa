import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function Register() {
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPassword: '',
    childName: '',
    childAge: '',
    childInterests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic with Firebase
    toast({
      title: 'Inscription en cours',
      description: 'Votre compte est en cours de création...',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <MainLayout>
      <Container maxW="container.md" py={12}>
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center">Créer un compte</Heading>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6}>
              {/* Parent Information */}
              <FormControl isRequired>
                <FormLabel>Nom du parent</FormLabel>
                <Input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) =>
                    setFormData({ ...formData, parentName: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email du parent</FormLabel>
                <Input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, parentEmail: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Mot de passe</FormLabel>
                <Input
                  type="password"
                  value={formData.parentPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, parentPassword: e.target.value })
                  }
                />
              </FormControl>

              {/* Child Information */}
              <FormControl isRequired>
                <FormLabel>Nom de l'enfant</FormLabel>
                <Input
                  type="text"
                  value={formData.childName}
                  onChange={(e) =>
                    setFormData({ ...formData, childName: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Âge de l'enfant</FormLabel>
                <Input
                  type="number"
                  min="5"
                  max="15"
                  value={formData.childAge}
                  onChange={(e) =>
                    setFormData({ ...formData, childAge: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Centres d'intérêt de l'enfant</FormLabel>
                <Input
                  type="text"
                  placeholder="Ex: programmation, mathématiques, jeux vidéo"
                  value={formData.childInterests}
                  onChange={(e) =>
                    setFormData({ ...formData, childInterests: e.target.value })
                  }
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" size="lg" w="full">
                Créer le compte
              </Button>

              <Text>
                Déjà un compte ?{' '}
                <Link color="blue.500" onClick={() => router.push('/login')}>
                  Se connecter
                </Link>
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </MainLayout>
  );
} 