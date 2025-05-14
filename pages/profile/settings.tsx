import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Grid,
  GridItem,
  Flex,
  Icon,
  Stack,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Divider,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Badge,
  Input,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaUser, FaBell, FaShieldAlt, FaCrown, FaPalette, FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

type SettingsTab = 'account' | 'notifications' | 'appearance' | 'security' | 'subscription';

export default function Settings() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('system');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const activeTabBg = useColorModeValue('purple.50', 'purple.900');
  const activeTabColor = useColorModeValue('purple.600', 'purple.200');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  if (!session) {
    return (
      <Container maxW="container.xl" py={10}>
        <Text>Veuillez vous connecter pour accéder à vos paramètres.</Text>
      </Container>
    );
  }

  const menuItems = [
    { id: 'account', label: 'Compte', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Apparence', icon: FaPalette },
    { id: 'security', label: 'Sécurité', icon: FaShieldAlt },
    { id: 'subscription', label: 'Abonnement', icon: FaCrown },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simuler une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Modifications enregistrées',
        description: 'Vos paramètres ont été mis à jour avec succès.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la sauvegarde.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <Stack spacing={6}>
            <Flex justify="space-between" align="center">
              <Heading size="md">Informations du compte</Heading>
              <Button
                colorScheme="purple"
                size="sm"
                onClick={handleSave}
                isLoading={isLoading}
                leftIcon={<FaCheck />}
              >
                Sauvegarder
              </Button>
            </Flex>
            <FormControl>
              <FormLabel fontWeight="medium">Nom complet</FormLabel>
              <Input 
                defaultValue={session.user?.name || ''} 
                bg={useColorModeValue('white', 'gray.800')}
                borderColor={useColorModeValue('gray.200', 'gray.600')}
                _hover={{
                  borderColor: useColorModeValue('gray.300', 'gray.500')
                }}
                _focus={{
                  borderColor: 'purple.500',
                  boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)'
                }}
                size="lg"
                fontSize="md"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="medium">Email</FormLabel>
              <Input 
                defaultValue={session.user?.email || ''} 
                isReadOnly
                bg={useColorModeValue('gray.50', 'gray.700')}
                borderColor={useColorModeValue('gray.200', 'gray.600')}
                _hover={{
                  borderColor: useColorModeValue('gray.300', 'gray.500')
                }}
                size="lg"
                fontSize="md"
                cursor="not-allowed"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="medium">Nom d'utilisateur</FormLabel>
              <Input 
                placeholder="@username"
                bg={useColorModeValue('white', 'gray.800')}
                borderColor={useColorModeValue('gray.200', 'gray.600')}
                _hover={{
                  borderColor: useColorModeValue('gray.300', 'gray.500')
                }}
                _focus={{
                  borderColor: 'purple.500',
                  boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)'
                }}
                size="lg"
                fontSize="md"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="medium">Bio</FormLabel>
              <Textarea
                placeholder="Parlez-nous un peu de vous..."
                resize="vertical"
                rows={3}
                bg={useColorModeValue('white', 'gray.800')}
                borderColor={useColorModeValue('gray.200', 'gray.600')}
                _hover={{
                  borderColor: useColorModeValue('gray.300', 'gray.500')
                }}
                _focus={{
                  borderColor: 'purple.500',
                  boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)'
                }}
                size="lg"
                fontSize="md"
              />
            </FormControl>
          </Stack>
        );

      case 'notifications':
        return (
          <Stack spacing={6}>
            <Flex justify="space-between" align="center">
              <Heading size="md">Notifications</Heading>
              <Button
                colorScheme="purple"
                size="sm"
                onClick={handleSave}
                isLoading={isLoading}
                leftIcon={<FaCheck />}
              >
                Sauvegarder
              </Button>
            </Flex>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-notifications" mb="0">
                Notifications par email
              </FormLabel>
              <Switch
                id="email-notifications"
                isChecked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                colorScheme="purple"
              />
            </FormControl>
            <Text fontSize="sm" color="gray.500">
              Recevez des notifications par email pour les activités importantes
            </Text>
          </Stack>
        );

      case 'appearance':
        return (
          <Stack spacing={6}>
            <Flex justify="space-between" align="center">
              <Heading size="md">Apparence</Heading>
              <Button
                colorScheme="purple"
                size="sm"
                onClick={handleSave}
                isLoading={isLoading}
                leftIcon={<FaCheck />}
              >
                Sauvegarder
              </Button>
            </Flex>
            <FormControl>
              <FormLabel>Langue</FormLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                bg={bgColor}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Thème</FormLabel>
              <Select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                bg={bgColor}
              >
                <option value="system">Système</option>
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
              </Select>
            </FormControl>
          </Stack>
        );

      case 'security':
        return (
          <Stack spacing={6}>
            <Heading size="md">Sécurité</Heading>
            <Stack spacing={4}>
              <Button
                colorScheme="purple"
                variant="outline"
                justifyContent="space-between"
                rightIcon={<Icon as={FaShieldAlt} />}
              >
                Changer le mot de passe
              </Button>
              <Button
                colorScheme="purple"
                variant="outline"
                justifyContent="space-between"
                rightIcon={<Icon as={FaShieldAlt} />}
              >
                Activer l'authentification à deux facteurs
              </Button>
            </Stack>
            <Alert
              status="info"
              variant="subtle"
              borderRadius="md"
              bg={activeTabBg}
            >
              <AlertIcon />
              <Text fontSize="sm">
                La sécurité de votre compte est importante. Nous vous recommandons d'activer
                l'authentification à deux facteurs.
              </Text>
            </Alert>
          </Stack>
        );

      case 'subscription':
        return (
          <Stack spacing={6}>
            <Heading size="md">Abonnement</Heading>
            <Box
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              p={6}
              bg={bgColor}
            >
              <Stack spacing={4}>
                <Flex justify="space-between" align="center">
                  <Stack spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">Plan PRO PLUS</Text>
                    <Text fontSize="sm" color="gray.500">
                      Facturé mensuellement
                    </Text>
                  </Stack>
                  <Badge colorScheme="green" px={3} py={1} borderRadius="full">
                    Actif
                  </Badge>
                </Flex>
                <Divider />
                <Stack spacing={3}>
                  <Text fontWeight="medium">Fonctionnalités incluses :</Text>
                  <Stack spacing={2}>
                    {['Création illimitée de jeux', 'Personnalisation avancée', 'Analytics détaillés', 'Support prioritaire'].map((feature) => (
                      <Flex key={feature} align="center" color="gray.600">
                        <Icon as={FaCheck} color="green.500" mr={2} />
                        <Text>{feature}</Text>
                      </Flex>
                    ))}
                  </Stack>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={4}>
                  <Button
                    colorScheme="purple"
                    onClick={() => router.push('/subscription/manage')}
                  >
                    Gérer l'abonnement
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/subscription/plans')}
                  >
                    Voir les autres plans
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={{ base: '1fr', md: '220px 1fr' }} gap={8}>
        {/* Sidebar */}
        <GridItem>
          <VStack
            spacing={1}
            align="stretch"
            position="sticky"
            top="100px"
          >
            {menuItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => setActiveTab(item.id as SettingsTab)}
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Icon as={item.icon} boxSize={4} />}
                bg={activeTab === item.id ? activeTabBg : 'transparent'}
                color={activeTab === item.id ? activeTabColor : 'inherit'}
                _hover={{
                  bg: activeTab === item.id ? activeTabBg : hoverBg,
                }}
                h="40px"
                fontSize="sm"
                fontWeight={activeTab === item.id ? "600" : "normal"}
                pl={4}
                borderRadius="md"
              >
                {item.label}
              </Button>
            ))}
          </VStack>
        </GridItem>

        {/* Content */}
        <GridItem>
          <Box
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            p={6}
          >
            {renderContent()}
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
} 