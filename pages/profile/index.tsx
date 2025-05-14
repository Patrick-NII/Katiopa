import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  useColorModeValue,
  Stack,
  Flex,
  Icon,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Switch,
  Select,
  Divider,
  Badge,
} from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';
import { 
  FaUser, 
  FaBell, 
  FaPalette, 
  FaGlobe, 
  FaShieldAlt, 
  FaCrown, 
  FaSignOutAlt,
  FaKey,
  FaImage
} from 'react-icons/fa';
import { useState } from 'react';
import { ProfilePictureUploader } from '@/components/Profile/ProfilePictureUploader';

export default function Settings() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('account');
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    notifications: true,
    language: 'fr',
    theme: 'system',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const toast = useToast();
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (!session) {
    return (
      <Container maxW="container.xl" py={10}>
        <Text>Veuillez vous connecter pour accéder à vos paramètres.</Text>
      </Container>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la déconnexion.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await update({
        ...session,
        user: {
          ...session.user,
          name: formData.name,
        }
      });

      toast({
        title: 'Paramètres mis à jour',
        description: 'Vos modifications ont été enregistrées avec succès.',
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

  const navigationItems = [
    { id: 'account', label: 'Compte', icon: FaUser },
    { id: 'security', label: 'Sécurité', icon: FaShieldAlt },
    { id: 'appearance', label: 'Apparence', icon: FaPalette },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'subscription', label: 'Abonnement', icon: FaCrown },
    { section: 'divider' },
    { id: 'logout', label: 'Se déconnecter', icon: FaSignOutAlt, onClick: handleLogout },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <Stack spacing={8}>
            <Box>
              <Text fontSize="sm" color={mutedTextColor} mb={4}>Photo de profil</Text>
              <Flex align="center" gap={6}>
                <ProfilePictureUploader 
                  size="xl"
                  isEditable={true}
                />
                <VStack align="start" spacing={1}>
                  <Button
                    leftIcon={<Icon as={FaImage} />}
                    variant="outline"
                    size="sm"
                    onClick={() => {}}
                  >
                    Changer l'avatar
                  </Button>
                  <Text fontSize="xs" color={mutedTextColor}>
                    JPG, GIF ou PNG. 1MB max.
                  </Text>
                </VStack>
              </Flex>
            </Box>

            <Divider />

            <Stack spacing={6}>
              <Box>
                <Text fontSize="sm" color={mutedTextColor} mb={1}>Nom complet</Text>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="flushed"
                  size="lg"
                  fontWeight="medium"
                  _focus={{ borderColor: 'purple.500' }}
                />
              </Box>
              <Box>
                <Text fontSize="sm" color={mutedTextColor} mb={1}>Email</Text>
                <Input
                  value={session.user?.email || ''}
                  isReadOnly
                  variant="flushed"
                  size="lg"
                  fontWeight="medium"
                  opacity={0.7}
                />
              </Box>
            </Stack>
          </Stack>
        );

      case 'security':
        return (
          <Stack spacing={8}>
            <Box>
              <Text fontSize="sm" color={mutedTextColor} mb={4}>Changement de mot de passe</Text>
              <Stack spacing={4}>
                <Box>
                  <Text fontSize="sm" color={mutedTextColor} mb={1}>Mot de passe actuel</Text>
                  <Input
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    variant="flushed"
                    size="lg"
                    _focus={{ borderColor: 'purple.500' }}
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" color={mutedTextColor} mb={1}>Nouveau mot de passe</Text>
                  <Input
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    variant="flushed"
                    size="lg"
                    _focus={{ borderColor: 'purple.500' }}
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" color={mutedTextColor} mb={1}>Confirmer le mot de passe</Text>
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    variant="flushed"
                    size="lg"
                    _focus={{ borderColor: 'purple.500' }}
                  />
                </Box>
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Text fontSize="sm" color={mutedTextColor} mb={4}>Authentification à deux facteurs</Text>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <FormLabel htmlFor="2fa" color={textColor} mb={0}>
                    Activer l'authentification 2FA
                  </FormLabel>
                  <Text fontSize="sm" color={mutedTextColor}>
                    Ajouter une couche de sécurité supplémentaire à votre compte
                  </Text>
                </Box>
                <Switch
                  id="2fa"
                  colorScheme="purple"
                />
              </FormControl>
            </Box>
          </Stack>
        );

      case 'subscription':
        return (
          <Stack spacing={8}>
            <Box>
              <Flex align="center" gap={2} mb={4}>
                <Badge colorScheme="purple" px={2} py={1}>
                  <Flex align="center" gap={2}>
                    <Icon as={FaCrown} />
                    PRO PLUS
                  </Flex>
                </Badge>
                <Text fontSize="sm" color={mutedTextColor}>Abonnement actif</Text>
              </Flex>
              
              <Text fontSize="sm" color={mutedTextColor}>
                Votre abonnement se renouvelle le 15 mai 2024
              </Text>
            </Box>

            <Divider />

            <Box>
              <Text fontSize="sm" color={mutedTextColor} mb={4}>Historique de paiement</Text>
              <Stack spacing={4}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="medium">15 avril 2024</Text>
                    <Text fontSize="sm" color={mutedTextColor}>Plan PRO PLUS - Mensuel</Text>
                  </Box>
                  <Text>29,99 €</Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="medium">15 mars 2024</Text>
                    <Text fontSize="sm" color={mutedTextColor}>Plan PRO PLUS - Mensuel</Text>
                  </Box>
                  <Text>29,99 €</Text>
                </Flex>
              </Stack>
            </Box>

            <Box>
              <Button colorScheme="red" variant="outline" size="sm">
                Annuler l'abonnement
              </Button>
            </Box>
          </Stack>
        );

      case 'appearance':
        return (
          <Stack spacing={6}>
            <Box>
              <Text fontSize="sm" color={mutedTextColor} mb={4}>Personnalisez l'apparence de votre tableau de bord</Text>
              <Box>
                <Text fontSize="sm" color={mutedTextColor} mb={1}>Thème</Text>
                <Select
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  variant="flushed"
                  size="lg"
                  fontWeight="medium"
                  icon={<FaPalette />}
                  _focus={{ borderColor: 'purple.500' }}
                >
                  <option value="system">Système</option>
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                </Select>
              </Box>
            </Box>
            <Box>
              <Text fontSize="sm" color={mutedTextColor} mb={1}>Langue</Text>
              <Select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                variant="flushed"
                size="lg"
                fontWeight="medium"
                icon={<FaGlobe />}
                _focus={{ borderColor: 'purple.500' }}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </Select>
            </Box>
          </Stack>
        );

      case 'notifications':
        return (
          <Stack spacing={6}>
            <Box>
              <Text fontSize="sm" color={mutedTextColor} mb={4}>Gérez vos préférences de notifications</Text>
              <Stack spacing={6}>
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel htmlFor="notifications" color={textColor} mb={0}>
                      Notifications par email
                    </FormLabel>
                    <Text fontSize="sm" color={mutedTextColor}>
                      Recevez des notifications sur les mises à jour importantes
                    </Text>
                  </Box>
                  <Switch
                    id="notifications"
                    isChecked={formData.notifications}
                    onChange={() => handleSwitchChange('notifications')}
                    colorScheme="purple"
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel htmlFor="marketing" color={textColor} mb={0}>
                      Communications marketing
                    </FormLabel>
                    <Text fontSize="sm" color={mutedTextColor}>
                      Recevez des offres et actualités sur nos services
                    </Text>
                  </Box>
                  <Switch
                    id="marketing"
                    colorScheme="purple"
                  />
                </FormControl>
              </Stack>
            </Box>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxW="7xl" py={8}>
      <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={8}>
        {/* Sidebar Navigation */}
        <GridItem>
          <VStack align="stretch" spacing={2}>
            <Heading size="md" mb={4}>Paramètres</Heading>
            {navigationItems.map((item) => {
              if (item.section === 'divider') {
                return <Divider key="divider" my={2} />;
              }
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  justifyContent="flex-start"
                  py={3}
                  px={4}
                  leftIcon={<Icon as={item.icon} boxSize={5} />}
                  onClick={item.onClick || (() => setActiveSection(item.id))}
                  color={activeSection === item.id ? 'purple.500' : textColor}
                  bg={activeSection === item.id ? useColorModeValue('gray.50', 'gray.700') : 'transparent'}
                  _hover={{
                    bg: useColorModeValue('gray.50', 'gray.700')
                  }}
                  w="full"
                  borderRadius="md"
                >
                  {item.label}
                </Button>
              );
            })}
          </VStack>
        </GridItem>

        {/* Main Content */}
        <GridItem>
          <Box>
            <Flex justify="space-between" align="center" mb={8}>
              <Box>
                <Heading size="md" mb={1}>
                  {navigationItems.find(item => item.id === activeSection)?.label}
                </Heading>
                <Text fontSize="sm" color={mutedTextColor}>
                  Gérez vos préférences et informations personnelles
                </Text>
              </Box>
              {activeSection !== 'subscription' && (
                <Button
                  colorScheme="purple"
                  size="sm"
                  onClick={handleSave}
                  isLoading={isLoading}
                >
                  Enregistrer
                </Button>
              )}
            </Flex>
            
            <Box borderWidth="1px" borderColor={borderColor} borderRadius="lg" p={6}>
              {renderContent()}
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
} 