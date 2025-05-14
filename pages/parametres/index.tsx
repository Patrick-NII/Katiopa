import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Select,
  useColorMode,
  InputGroup,
  InputRightElement,
  IconButton,
  Badge,
  Divider,
  useToast,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Collapse,
  SlideFade,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
  Kbd,
  Progress,
  Tag,
  TagLabel,
  TagLeftIcon,
  Flex,
  Skeleton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useClipboard,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  Code,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import {
  FaShieldAlt,
  FaPalette,
  FaBell,
  FaCreditCard,
  FaEye,
  FaEyeSlash,
  FaGlobe,
  FaSun,
  FaMoon,
  FaCrown,
  FaCheck,
  FaExclamationTriangle,
  FaSearch,
  FaDatabase,
  FaDownload,
  FaTrash,
  FaInfoCircle,
  FaKey,
  FaLock,
  FaUnlock,
  FaHistory,
  FaUserShield,
  FaCheckCircle,
  FaFileExport,
  FaFileImport,
  FaFingerprint,
  FaQrCode,
  FaShieldVirus,
  FaUserLock,
  FaChartLine,
  FaCalendarAlt,
  FaCog,
  FaLink,
  FaShareAlt,
} from 'react-icons/fa';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

export default function Settings() {
  const { data: session } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [securityScore, setSecurityScore] = useState(75);
  const [showSecurityReport, setShowSecurityReport] = useState(false);
  const { hasCopied, onCopy } = useClipboard("Backup codes here");
  const cancelRef = useRef();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'fr',
    theme: colorMode,
    emailNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    twoFactorAuth: false,
  });

  // Colors
  const bgCard = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  // Responsive layout
  const isMobile = useBreakpointValue({ base: true, md: false });
  const cardWidth = useBreakpointValue({ base: "100%", md: "calc(50% - 1rem)" });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 's':
            e.preventDefault();
            if (hasUnsavedChanges) handleSaveAll();
            break;
          case 'f':
            e.preventDefault();
            document.getElementById('searchSettings')?.focus();
            break;
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
            e.preventDefault();
            setSelectedTab(Number(e.key) - 1);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasUnsavedChanges]);

  // Password strength checker
  const checkPasswordStrength = useCallback((password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[a-z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^A-Za-z0-9]/)) strength += 20;
    setPasswordStrength(strength);
    setIsPasswordStrong(strength >= 80);
  }, []);

  useEffect(() => {
    checkPasswordStrength(formData.newPassword);
  }, [formData.newPassword, checkPasswordStrength]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

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

  const handleThemeChange = (value: string) => {
    setFormData(prev => ({ ...prev, theme: value }));
    if (value === 'dark' || value === 'light') {
      if (colorMode !== value) {
        toggleColorMode();
      }
    }
  };

  const handlePasswordChange = async () => {
    if (!isPasswordStrong) {
      toast({
        title: "Mot de passe trop faible",
        description: "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Succès",
        description: "Votre mot de passe a été mis à jour",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du mot de passe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setIsLoading(true);
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setHasUnsavedChanges(false);
      toast({
        title: "Modifications enregistrées",
        description: "Tous vos paramètres ont été mis à jour avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataExport = () => {
    // Simuler un export de données
    toast({
      title: "Export en cours",
      description: "Vos données seront envoyées par email",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDataDeletion = () => {
    onOpen();
  };

  // Calculer le score de sécurité
  const calculateSecurityScore = useCallback(() => {
    let score = 0;
    if (formData.twoFactorAuth) score += 30;
    if (isPasswordStrong) score += 30;
    if (formData.securityAlerts) score += 20;
    if (session?.user?.email_verified) score += 20;
    setSecurityScore(score);
  }, [formData.twoFactorAuth, isPasswordStrong, formData.securityAlerts, session?.user?.email_verified]);

  useEffect(() => {
    calculateSecurityScore();
  }, [calculateSecurityScore]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box bg={useColorModeValue('white', 'gray.800')} p={6} rounded="lg" shadow="sm">
            <HStack justify="space-between" mb={6}>
              <Box>
                <Heading size="lg" mb={2}>Paramètres</Heading>
                <Text color={textColor}>
                  Gérez vos préférences et la sécurité de votre compte
                  <Text as="span" fontSize="sm" color={mutedTextColor} ml={2}>
                    (Ctrl/⌘ + F pour rechercher)
                  </Text>
                </Text>
              </Box>
              <AnimatePresence>
                {hasUnsavedChanges && (
                  <MotionBox
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Tooltip label="Ctrl/⌘ + S pour sauvegarder">
                      <Button
                        colorScheme="brand"
                        leftIcon={<Icon as={FaCheck} />}
                        isLoading={isLoading}
                        onClick={handleSaveAll}
                      >
                        Enregistrer
                      </Button>
                    </Tooltip>
                  </MotionBox>
                )}
              </AnimatePresence>
            </HStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                id="searchSettings"
                placeholder="Rechercher dans les paramètres... (Ctrl/⌘ + F)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={useColorModeValue('gray.50', 'gray.700')}
              />
            </InputGroup>
          </Box>

          {/* Main Content */}
          <Box bg={useColorModeValue('white', 'gray.800')} rounded="lg" shadow="sm" overflow="hidden">
            <Tabs 
              index={selectedTab} 
              onChange={setSelectedTab} 
              variant="line" 
              colorScheme="brand"
              isLazy
            >
              <TabList borderBottomWidth="1px" borderBottomColor={useColorModeValue('gray.200', 'gray.700')} px={4}>
                <Tab py={4} px={4} fontWeight="medium">
                  <HStack spacing={2}>
                    <Icon as={FaShieldAlt} />
                    <Text>Sécurité</Text>
                    <Kbd display={{ base: 'none', md: 'inline-block' }} size="xs">1</Kbd>
                  </HStack>
                </Tab>
                <Tab py={4} px={4} fontWeight="medium">
                  <HStack spacing={2}>
                    <Icon as={FaPalette} />
                    <Text>Apparence</Text>
                    <Kbd display={{ base: 'none', md: 'inline-block' }} size="xs">2</Kbd>
                  </HStack>
                </Tab>
                <Tab py={4} px={4} fontWeight="medium">
                  <HStack spacing={2}>
                    <Icon as={FaBell} />
                    <Text>Notifications</Text>
                    <Kbd display={{ base: 'none', md: 'inline-block' }} size="xs">3</Kbd>
                  </HStack>
                </Tab>
                <Tab py={4} px={4} fontWeight="medium">
                  <HStack spacing={2}>
                    <Icon as={FaCreditCard} />
                    <Text>Abonnement</Text>
                    <Kbd display={{ base: 'none', md: 'inline-block' }} size="xs">4</Kbd>
                  </HStack>
                </Tab>
                <Tab py={4} px={4} fontWeight="medium">
                  <HStack spacing={2}>
                    <Icon as={FaDatabase} />
                    <Text>Données</Text>
                    <Kbd display={{ base: 'none', md: 'inline-block' }} size="xs">5</Kbd>
                  </HStack>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={6}>
                  {/* Security Panel Content */}
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                    <Card bg={bgCard} borderColor={borderColor} borderWidth="1px">
                      <CardHeader>
                        <HStack justify="space-between">
                          <Heading size="md">
                            <Icon as={FaShieldAlt} mr={2} color="brand.500" />
                            Sécurité
                          </Heading>
                          <Tag colorScheme={formData.twoFactorAuth ? 'green' : 'yellow'}>
                            <TagLeftIcon as={formData.twoFactorAuth ? FaLock : FaUnlock} />
                            <TagLabel>{formData.twoFactorAuth ? 'Sécurisé' : 'Basic'}</TagLabel>
                          </Tag>
                        </HStack>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={6}>
                          <Box w="full">
                            <Text fontSize="sm" color={mutedTextColor} mb={4}>Changer le mot de passe</Text>
                            <VStack spacing={4}>
                              <FormControl>
                                <FormLabel color={mutedTextColor}>
                                  <HStack>
                                    <Icon as={FaKey} />
                                    <Text>Mot de passe actuel</Text>
                                  </HStack>
                                </FormLabel>
                                <InputGroup>
                                  <Input
                                    name="currentPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    bg={inputBg}
                                  />
                                  <InputRightElement>
                                    <IconButton
                                      aria-label="Toggle password visibility"
                                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                      variant="ghost"
                                      onClick={() => setShowPassword(!showPassword)}
                                    />
                                  </InputRightElement>
                                </InputGroup>
                              </FormControl>

                              <FormControl>
                                <FormLabel color={mutedTextColor}>
                                  <HStack>
                                    <Icon as={FaKey} />
                                    <Text>Nouveau mot de passe</Text>
                                  </HStack>
                                </FormLabel>
                                <InputGroup>
                                  <Input
                                    name="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    bg={inputBg}
                                  />
                                  <InputRightElement>
                                    <IconButton
                                      aria-label="Toggle password visibility"
                                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                      variant="ghost"
                                      onClick={() => setShowPassword(!showPassword)}
                                    />
                                  </InputRightElement>
                                </InputGroup>
                                <Box mt={2}>
                                  <Progress value={passwordStrength} colorScheme={passwordStrength >= 80 ? 'green' : 'orange'} size="sm" />
                                  <Text fontSize="xs" color={mutedTextColor} mt={1}>
                                    Force du mot de passe: {passwordStrength}%
                                  </Text>
                                </Box>
                              </FormControl>

                              <FormControl>
                                <FormLabel color={mutedTextColor}>
                                  <HStack>
                                    <Icon as={FaCheckCircle} />
                                    <Text>Confirmer le mot de passe</Text>
                                  </HStack>
                                </FormLabel>
                                <InputGroup>
                                  <Input
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    bg={inputBg}
                                  />
                                  <InputRightElement>
                                    <IconButton
                                      aria-label="Toggle password visibility"
                                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                      variant="ghost"
                                      onClick={() => setShowPassword(!showPassword)}
                                    />
                                  </InputRightElement>
                                </InputGroup>
                              </FormControl>

                              <Button
                                colorScheme="brand"
                                onClick={handlePasswordChange}
                                isLoading={isLoading}
                                alignSelf="start"
                                leftIcon={<Icon as={FaKey} />}
                              >
                                Mettre à jour le mot de passe
                              </Button>
                            </VStack>
                          </Box>

                          <Divider />

                          <FormControl display="flex" alignItems="center" justifyContent="space-between">
                            <Box>
                              <FormLabel htmlFor="2fa" mb={0}>
                                <HStack>
                                  <Icon as={FaUserShield} />
                                  <Text>Authentification à deux facteurs</Text>
                                </HStack>
                              </FormLabel>
                              <Text fontSize="sm" color={mutedTextColor}>
                                Ajouter une couche de sécurité supplémentaire
                              </Text>
                            </Box>
                            <Switch
                              id="2fa"
                              isChecked={formData.twoFactorAuth}
                              onChange={() => handleSwitchChange('twoFactorAuth')}
                              colorScheme="brand"
                              size="lg"
                            />
                          </FormControl>

                          <Box w="full">
                            <Text fontSize="sm" fontWeight="medium" mb={2}>
                              <Icon as={FaHistory} mr={2} />
                              Historique des connexions
                            </Text>
                            <VStack spacing={3} align="stretch">
                              <HStack justify="space-between" p={4} bg={inputBg} borderRadius="md">
                                <Box>
                                  <Text fontWeight="medium">Aujourd'hui, 15:30</Text>
                                  <Text fontSize="sm" color={mutedTextColor}>Paris, France • Chrome sur Windows</Text>
                                </Box>
                                <Tag colorScheme="green">Actuelle</Tag>
                              </HStack>
                              <HStack justify="space-between" p={4} bg={inputBg} borderRadius="md">
                                <Box>
                                  <Text fontWeight="medium">Hier, 18:45</Text>
                                  <Text fontSize="sm" color={mutedTextColor}>Paris, France • Safari sur iPhone</Text>
                                </Box>
                              </HStack>
                            </VStack>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </TabPanel>

                <TabPanel p={6}>
                  {/* Appearance Panel Content */}
                  <VStack spacing={6} align="stretch">
                    <Box w="full">
                      <FormLabel color={mutedTextColor}>Thème</FormLabel>
                      <RadioGroup
                        value={formData.theme}
                        onChange={handleThemeChange}
                      >
                        <Stack direction="row" spacing={4}>
                          <Radio value="light">
                            <HStack>
                              <Icon as={FaSun} />
                              <Text>Clair</Text>
                            </HStack>
                          </Radio>
                          <Radio value="dark">
                            <HStack>
                              <Icon as={FaMoon} />
                              <Text>Sombre</Text>
                            </HStack>
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </Box>

                    <Box w="full">
                      <FormLabel color={mutedTextColor}>Langue</FormLabel>
                      <Select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        bg={inputBg}
                        icon={<FaGlobe />}
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                      </Select>
                    </Box>
                  </VStack>
                </TabPanel>

                <TabPanel p={6}>
                  {/* Notifications Panel Content */}
                  <VStack spacing={6} align="stretch">
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="emailNotifications" mb={0}>Notifications par email</FormLabel>
                        <Text fontSize="sm" color={mutedTextColor}>
                          Recevez des notifications sur les mises à jour importantes
                        </Text>
                      </Box>
                      <Switch
                        id="emailNotifications"
                        isChecked={formData.emailNotifications}
                        onChange={() => handleSwitchChange('emailNotifications')}
                        colorScheme="brand"
                      />
                    </FormControl>

                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="marketingEmails" mb={0}>Communications marketing</FormLabel>
                        <Text fontSize="sm" color={mutedTextColor}>
                          Recevez des offres et actualités sur nos services
                        </Text>
                      </Box>
                      <Switch
                        id="marketingEmails"
                        isChecked={formData.marketingEmails}
                        onChange={() => handleSwitchChange('marketingEmails')}
                        colorScheme="brand"
                      />
                    </FormControl>

                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="securityAlerts" mb={0}>Alertes de sécurité</FormLabel>
                        <Text fontSize="sm" color={mutedTextColor}>
                          Recevez des notifications sur les activités suspectes
                        </Text>
                      </Box>
                      <Switch
                        id="securityAlerts"
                        isChecked={formData.securityAlerts}
                        onChange={() => handleSwitchChange('securityAlerts')}
                        colorScheme="brand"
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>

                <TabPanel p={6}>
                  {/* Subscription Panel Content */}
                  <VStack spacing={6} align="stretch">
                    <HStack>
                      <Badge 
                        colorScheme="brand" 
                        px={3} 
                        py={1} 
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                      >
                        PRO+ <Icon as={FaCrown} ml={1} />
                      </Badge>
                      <Text fontSize="sm" color={mutedTextColor}>
                        Abonnement actif • Renouvellement le 15 mai 2024
                      </Text>
                    </HStack>

                    <Box>
                      <Text fontSize="sm" color={mutedTextColor} mb={4}>Historique de paiement</Text>
                      <VStack spacing={3} align="stretch">
                        <HStack justify="space-between" p={4} bg={inputBg} borderRadius="md">
                          <Box>
                            <Text fontWeight="medium">15 avril 2024</Text>
                            <Text fontSize="sm" color={mutedTextColor}>Plan PRO+ - Mensuel</Text>
                          </Box>
                          <Text>29,99 €</Text>
                        </HStack>
                        <HStack justify="space-between" p={4} bg={inputBg} borderRadius="md">
                          <Box>
                            <Text fontWeight="medium">15 mars 2024</Text>
                            <Text fontSize="sm" color={mutedTextColor}>Plan PRO+ - Mensuel</Text>
                          </Box>
                          <Text>29,99 €</Text>
                        </HStack>
                      </VStack>
                    </Box>

                    <Button
                      leftIcon={<Icon as={FaExclamationTriangle} />}
                      variant="outline"
                      colorScheme="red"
                      size="sm"
                      alignSelf="start"
                    >
                      Annuler l'abonnement
                    </Button>
                  </VStack>
                </TabPanel>

                <TabPanel p={6}>
                  {/* Data Panel Content */}
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="sm" color={mutedTextColor}>
                      Gérez vos données personnelles conformément au RGPD
                    </Text>
                    
                    <HStack spacing={4}>
                      <Tooltip label="Télécharger toutes vos données personnelles au format JSON">
                        <Button
                          leftIcon={<Icon as={FaDownload} />}
                          onClick={handleDataExport}
                          size="sm"
                        >
                          Exporter mes données
                        </Button>
                      </Tooltip>

                      <Tooltip label="Supprimer définitivement votre compte et toutes vos données">
                        <Button
                          leftIcon={<Icon as={FaTrash} />}
                          colorScheme="red"
                          variant="outline"
                          onClick={handleDataDeletion}
                          size="sm"
                        >
                          Supprimer mon compte
                        </Button>
                      </Tooltip>
                    </HStack>

                    <Box>
                      <Text fontSize="sm" fontWeight="medium" mb={2}>
                        Données collectées :
                      </Text>
                      <List spacing={2}>
                        <ListItem>
                          <ListIcon as={FaInfoCircle} color="brand.500" />
                          Informations de profil (nom, email, avatar)
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaInfoCircle} color="brand.500" />
                          Historique des jeux créés et cours suivis
                        </ListItem>
                        <ListItem>
                          <ListIcon as={FaInfoCircle} color="brand.500" />
                          Préférences de notification et paramètres
                        </ListItem>
                      </List>
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Text>
                Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et entraînera :
              </Text>
              <List spacing={2}>
                <ListItem>
                  <ListIcon as={FaExclamationTriangle} color="red.500" />
                  La suppression de toutes vos données personnelles
                </ListItem>
                <ListItem>
                  <ListIcon as={FaExclamationTriangle} color="red.500" />
                  La perte de vos jeux créés et cours suivis
                </ListItem>
                <ListItem>
                  <ListIcon as={FaExclamationTriangle} color="red.500" />
                  L'annulation de votre abonnement PRO+
                </ListItem>
              </List>
              <HStack spacing={4} mt={4}>
                <Button colorScheme="red" onClick={onClose}>
                  Confirmer la suppression
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Annuler
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
} 