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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const [parentCredentials, setParentCredentials] = useState({
    email: '',
    password: '',
  });
  const [childCredentials, setChildCredentials] = useState({
    username: '',
    password: '',
  });

  const handleParentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement parent login logic with Firebase
    toast({
      title: 'Connexion en cours',
      description: 'Vérification de vos identifiants...',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleChildLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement child login logic with Firebase
    toast({
      title: 'Connexion en cours',
      description: 'Vérification de vos identifiants...',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <MainLayout>
      <Container maxW="container.md" py={12}>
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center">Connexion</Heading>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Parent</Tab>
              <Tab>Enfant</Tab>
            </TabList>
            <TabPanels>
              {/* Parent Login */}
              <TabPanel>
                <Box as="form" onSubmit={handleParentLogin}>
                  <VStack spacing={6}>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        value={parentCredentials.email}
                        onChange={(e) =>
                          setParentCredentials({
                            ...parentCredentials,
                            email: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Mot de passe</FormLabel>
                      <Input
                        type="password"
                        value={parentCredentials.password}
                        onChange={(e) =>
                          setParentCredentials({
                            ...parentCredentials,
                            password: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <Button type="submit" colorScheme="blue" size="lg" w="full">
                      Se connecter
                    </Button>
                  </VStack>
                </Box>
              </TabPanel>

              {/* Child Login */}
              <TabPanel>
                <Box as="form" onSubmit={handleChildLogin}>
                  <VStack spacing={6}>
                    <FormControl isRequired>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <Input
                        type="text"
                        value={childCredentials.username}
                        onChange={(e) =>
                          setChildCredentials({
                            ...childCredentials,
                            username: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Mot de passe</FormLabel>
                      <Input
                        type="password"
                        value={childCredentials.password}
                        onChange={(e) =>
                          setChildCredentials({
                            ...childCredentials,
                            password: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <Button type="submit" colorScheme="blue" size="lg" w="full">
                      Se connecter
                    </Button>
                  </VStack>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Text textAlign="center">
            Pas encore de compte ?{' '}
            <Link color="blue.500" onClick={() => router.push('/register')}>
              S'inscrire
            </Link>
          </Text>
        </VStack>
      </Container>
    </MainLayout>
  );
} 