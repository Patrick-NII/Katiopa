import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  Flex,
  Icon,
  Image,
  useColorModeValue,
  Badge,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';
import { FaStar, FaCoins, FaLock, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

interface Theme {
  id: string;
  name: string;
  background: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  unlocked: boolean;
  cost: number;
}

interface Avatar {
  id: string;
  name: string;
  image: string;
  unlocked: boolean;
  cost: number;
}

const themes: Theme[] = [
  {
    id: 'space',
    name: 'Espace',
    background: '/images/themes/space-bg.jpg',
    colors: {
      primary: '#4A90E2',
      secondary: '#9013FE',
      accent: '#00D2FF',
    },
    unlocked: true,
    cost: 0,
  },
  {
    id: 'jungle',
    name: 'Jungle',
    background: '/images/themes/jungle-bg.jpg',
    colors: {
      primary: '#2ECC71',
      secondary: '#27AE60',
      accent: '#F1C40F',
    },
    unlocked: false,
    cost: 100,
  },
  {
    id: 'ocean',
    name: 'Océan',
    background: '/images/themes/ocean-bg.jpg',
    colors: {
      primary: '#3498DB',
      secondary: '#2980B9',
      accent: '#1ABC9C',
    },
    unlocked: false,
    cost: 150,
  },
];

const avatars: Avatar[] = [
  {
    id: 'robot',
    name: 'Robo',
    image: '/images/avatars/robot.png',
    unlocked: true,
    cost: 0,
  },
  {
    id: 'astronaut',
    name: 'Astro',
    image: '/images/avatars/astronaut.png',
    unlocked: false,
    cost: 200,
  },
  {
    id: 'explorer',
    name: 'Explo',
    image: '/images/avatars/explorer.png',
    unlocked: false,
    cost: 300,
  },
];

interface GameThemeProps {
  coins: number;
  onThemeChange: (theme: Theme) => void;
  onAvatarChange: (avatar: Avatar) => void;
}

export const GameTheme: React.FC<GameThemeProps> = ({ coins, onThemeChange, onAvatarChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatars[0]);

  const handleThemeSelect = (theme: Theme) => {
    if (theme.unlocked || coins >= theme.cost) {
      setSelectedTheme(theme);
      onThemeChange(theme);
    }
  };

  const handleAvatarSelect = (avatar: Avatar) => {
    if (avatar.unlocked || coins >= avatar.cost) {
      setSelectedAvatar(avatar);
      onAvatarChange(avatar);
    }
  };

  return (
    <>
      <Button
        leftIcon={<Icon as={FaStar} />}
        colorScheme="brand"
        onClick={onOpen}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
      >
        Personnaliser
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Personnalisation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="md" mb={4}>Thèmes</Heading>
                <SimpleGrid columns={3} spacing={4}>
                  {themes.map((theme) => (
                    <Tooltip
                      key={theme.id}
                      label={!theme.unlocked ? `Débloquer pour ${theme.cost} pièces` : ''}
                    >
                      <MotionBox
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Box
                          position="relative"
                          cursor="pointer"
                          onClick={() => handleThemeSelect(theme)}
                          opacity={theme.unlocked || coins >= theme.cost ? 1 : 0.5}
                        >
                          <Image
                            src={theme.background}
                            alt={theme.name}
                            borderRadius="lg"
                            boxShadow="md"
                          />
                          <Badge
                            position="absolute"
                            top={2}
                            right={2}
                            colorScheme={theme.unlocked ? 'green' : 'gray'}
                          >
                            {theme.unlocked ? (
                              <Icon as={FaCheck} />
                            ) : (
                              <Icon as={FaLock} />
                            )}
                          </Badge>
                          <Text
                            position="absolute"
                            bottom={2}
                            left={2}
                            color="white"
                            fontWeight="bold"
                            textShadow="1px 1px 2px black"
                          >
                            {theme.name}
                          </Text>
                        </Box>
                      </MotionBox>
                    </Tooltip>
                  ))}
                </SimpleGrid>
              </Box>

              <Box>
                <Heading size="md" mb={4}>Avatars</Heading>
                <SimpleGrid columns={3} spacing={4}>
                  {avatars.map((avatar) => (
                    <Tooltip
                      key={avatar.id}
                      label={!avatar.unlocked ? `Débloquer pour ${avatar.cost} pièces` : ''}
                    >
                      <MotionBox
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Box
                          position="relative"
                          cursor="pointer"
                          onClick={() => handleAvatarSelect(avatar)}
                          opacity={avatar.unlocked || coins >= avatar.cost ? 1 : 0.5}
                        >
                          <Image
                            src={avatar.image}
                            alt={avatar.name}
                            borderRadius="full"
                            boxSize="100px"
                            boxShadow="md"
                          />
                          <Badge
                            position="absolute"
                            top={2}
                            right={2}
                            colorScheme={avatar.unlocked ? 'green' : 'gray'}
                          >
                            {avatar.unlocked ? (
                              <Icon as={FaCheck} />
                            ) : (
                              <Icon as={FaLock} />
                            )}
                          </Badge>
                          <Text
                            position="absolute"
                            bottom={2}
                            left={2}
                            color="white"
                            fontWeight="bold"
                            textShadow="1px 1px 2px black"
                          >
                            {avatar.name}
                          </Text>
                        </Box>
                      </MotionBox>
                    </Tooltip>
                  ))}
                </SimpleGrid>
              </Box>

              <Flex justify="space-between" align="center">
                <HStack>
                  <Icon as={FaCoins} color="yellow.500" />
                  <Text fontWeight="bold">{coins} pièces</Text>
                </HStack>
                <Button colorScheme="brand" onClick={onClose}>
                  Fermer
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}; 