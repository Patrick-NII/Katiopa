import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  Icon,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Image,
  Text,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from '@chakra-ui/react';
import { FaCamera, FaStar, FaCode, FaTrophy, FaChartLine } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { getAllAvatars } from '@/utils/avatars';

interface ProfilePictureUploaderProps {
  size?: string;
  isEditable?: boolean;
}

export function ProfilePictureUploader({ 
  size = 'md',
  isEditable = false,
}: ProfilePictureUploaderProps) {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [availableAvatars, setAvailableAvatars] = useState<string[]>([]);
  const objectUrlRef = useRef<string | null>(null);

  // Nettoyer les URL d'objets lors du démontage
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // Charger les avatars disponibles une seule fois
  useEffect(() => {
    if (isEditable && availableAvatars.length === 0) {
      setAvailableAvatars(getAllAvatars());
    }
  }, [isEditable, availableAvatars.length]);

  const updateUserAvatar = useCallback(async (imageUrl: string) => {
    if (!session || isLoading) return;
    
    try {
      setIsLoading(true);

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      
      await update({
        ...session,
        user: {
          ...session.user,
          image: imageUrl,
        },
      });

      toast({
        title: 'Avatar mis à jour',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'avatar:', error);
      
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour l\'avatar',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [session, update, toast, isLoading]);

  const handleAvatarSelect = async (avatarUrl: string) => {
    if (isLoading) return;
    await updateUserAvatar(avatarUrl);
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      objectUrlRef.current = imageUrl;
      await updateUserAvatar(imageUrl);
      onClose();
    } catch (error) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      toast({
        title: 'Erreur lors du téléchargement',
        description: 'Une erreur est survenue lors du téléchargement de votre photo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={6} align="stretch" w="100%">
      <Box position="relative" display="inline-block" alignSelf="center">
        <Avatar
          size={size}
          src={session?.user?.image || undefined}
          name={session?.user?.name || undefined}
        />
        {isEditable && (
          <Button
            position="absolute"
            bottom={0}
            right={0}
            size="sm"
            borderRadius="full"
            variant="ghost"
            onClick={onOpen}
            isDisabled={isLoading}
          >
            <Icon as={FaCamera} />
          </Button>
        )}
      </Box>

      <Tabs variant="soft-rounded" colorScheme="gray" w="100%">
        <TabList justifyContent="center" mb={4}>
          <Tab><Icon as={FaChartLine} mr={2} /> Progression</Tab>
          <Tab><Icon as={FaCode} mr={2} /> Exercices</Tab>
          <Tab><Icon as={FaTrophy} mr={2} /> Défis</Tab>
          <Tab><Icon as={FaStar} mr={2} /> Réalisations</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <StatGroup>
              <Stat>
                <StatLabel>Niveau</StatLabel>
                <StatNumber>12</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>XP Total</StatLabel>
                <StatNumber>2,450</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Rang</StatLabel>
                <StatNumber>Silver</StatNumber>
              </Stat>
            </StatGroup>
          </TabPanel>

          <TabPanel>
            <StatGroup>
              <Stat>
                <StatLabel>Exercices Résolus</StatLabel>
                <StatNumber>45</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Exercices Créés</StatLabel>
                <StatNumber>3</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Taux de Réussite</StatLabel>
                <StatNumber>85%</StatNumber>
              </Stat>
            </StatGroup>
          </TabPanel>

          <TabPanel>
            <StatGroup>
              <Stat>
                <StatLabel>Défis Complétés</StatLabel>
                <StatNumber>8</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Défis en Cours</StatLabel>
                <StatNumber>2</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Points de Défi</StatLabel>
                <StatNumber>350</StatNumber>
              </Stat>
            </StatGroup>
          </TabPanel>

          <TabPanel>
            <StatGroup>
              <Stat>
                <StatLabel>Badges Obtenus</StatLabel>
                <StatNumber>15</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Contributions</StatLabel>
                <StatNumber>24</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Réputation</StatLabel>
                <StatNumber>780</StatNumber>
              </Stat>
            </StatGroup>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {isEditable && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Choisir un avatar</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <SimpleGrid columns={4} spacing={4} mb={4}>
                {availableAvatars.map((avatar, index) => (
                  <Box
                    key={index}
                    cursor="pointer"
                    borderRadius="md"
                    overflow="hidden"
                    onClick={() => handleAvatarSelect(avatar)}
                    _hover={{ transform: 'scale(1.02)' }}
                    opacity={isLoading ? 0.5 : 1}
                    pointerEvents={isLoading ? 'none' : 'auto'}
                  >
                    <Image src={avatar} alt={`Avatar ${index + 1}`} />
                  </Box>
                ))}
              </SimpleGrid>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                isDisabled={isLoading}
                variant="unstyled"
                p={1}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
} 