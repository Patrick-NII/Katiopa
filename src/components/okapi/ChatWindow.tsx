import { Box, Text, VStack, Input, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Image, IconButton, Button, Wrap, WrapItem, useColorModeValue, Icon, Flex } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { keyframes } from '@emotion/react';

// Animation du gradient
const gradientAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Créer les composants motion une seule fois en dehors du composant
const MotionModalContent = motion.create(ModalContent);
const MotionText = motion.create(Text);
const MotionImage = motion.create(Image);

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "Comment puis-je t'aider aujourd'hui ? 🌟",
  "On explore les maths ensemble ? 🔢",
  "Besoin d'aide pour tes devoirs ? 📚",
  "Découvrons de nouveaux jeux ! 🎮",
  "Je peux t'expliquer un concept ? 💡"
];

export const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { subscription } = useSubscription();
  const toast = useToast();

  // Couleurs et styles adaptatifs
  const bgColor = useColorModeValue('white', 'gray.900');
  const headerBg = useColorModeValue('purple.50', 'purple.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const messageBg = useColorModeValue('purple.500', 'purple.400');
  const messageUserBg = useColorModeValue('blue.500', 'blue.400');
  const inputBg = useColorModeValue('gray.50', 'gray.800');
  const buttonGradient = useColorModeValue(
    'linear(to-r, purple.400, blue.500)',
    'linear(to-r, purple.300, blue.400)'
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user' as const, content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          subscription: subscription?.plan,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la communication avec Okapi');
      }

      const data = await response.json();
      
      // Simuler un délai de frappe naturel
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la communication avec Okapi',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay backdropFilter="blur(8px)" />
      <MotionModalContent
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        mx={4}
        overflow="hidden"
        borderRadius="2xl"
        bg={bgColor}
        boxShadow="xl"
      >
        <Box position="relative" height="600px">
          {/* Header avec gradient animé */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            height="200px"
            bgGradient={buttonGradient}
            animation={`${gradientAnimation} 15s ease infinite`}
            backgroundSize="200% 200%"
            opacity={0.1}
          />

          <ModalHeader 
            bg={headerBg}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            pt={8}
            pb={6}
            px={8}
            position="relative"
          >
            <MotionImage
              src="/katiopa/okapi-avatar.png"
              alt="Okapi"
              boxSize="80px"
              borderRadius="full"
              objectFit="cover"
              mb={4}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              filter="drop-shadow(0 4px 8px rgba(147, 51, 234, 0.2))"
              _hover={{
                transform: 'scale(1.05) rotate(5deg)',
                transition: 'all 0.3s ease'
              }}
            />
            <MotionText
              fontSize="2xl"
              fontWeight="bold"
              bgGradient={buttonGradient}
              bgClip="text"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Okapi
            </MotionText>
            <MotionText
              fontSize="md"
              color={secondaryTextColor}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Ton assistant personnel
            </MotionText>
          </ModalHeader>
          
          <ModalCloseButton 
            size="lg"
            color={textColor}
            _hover={{
              bg: 'transparent',
              transform: 'scale(1.1)',
            }}
            transition="all 0.2s"
          />

          <ModalBody 
            pt={4} 
            pb={20}
            px={6}
            maxH="calc(100% - 180px)"
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(147, 51, 234, 0.2)',
                borderRadius: '2px',
                '&:hover': {
                  background: 'rgba(147, 51, 234, 0.3)',
                },
              },
            }}
          >
            {messages.length === 0 ? (
              <Wrap spacing={3} justify="center" mt={4}>
                {SUGGESTIONS.map((suggestion, index) => (
                  <WrapItem key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Button
                        onClick={() => handleSend(suggestion)}
                        variant="ghost"
                        color="purple.500"
                        _hover={{
                          bg: 'purple.50',
                          transform: 'translateY(-2px)',
                          shadow: 'md',
                        }}
                        _active={{
                          bg: 'purple.100',
                        }}
                        borderRadius="full"
                        px={6}
                        py={3}
                        fontSize="sm"
                        fontWeight="medium"
                        transition="all 0.2s"
                      >
                        {suggestion}
                      </Button>
                    </motion.div>
                  </WrapItem>
                ))}
              </Wrap>
            ) : (
              <VStack spacing={4} align="stretch">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                      maxW="80%"
                      bg={message.role === 'user' ? messageUserBg : messageBg}
                      color="white"
                      px={4}
                      py={3}
                      borderRadius={message.role === 'user' ? '2xl 2xl 0 2xl' : '2xl 2xl 2xl 0'}
                      boxShadow="lg"
                      position="relative"
                      _hover={{
                        transform: 'translateY(-1px)',
                        boxShadow: 'xl',
                      }}
                      transition="all 0.2s"
                    >
                      <Text fontSize="sm">{message.content}</Text>
                    </Box>
                  </motion.div>
                ))}
                {isTyping && (
                  <Box alignSelf="flex-start" ml={2}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon
                        as={FaRobot}
                        color="purple.500"
                        w={4}
                        h={4}
                        animation="pulse 1s infinite"
                      />
                    </motion.div>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </VStack>
            )}
          </ModalBody>

          {/* Zone de saisie fixe en bas */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p={4}
            bg={bgColor}
            borderTop="1px solid"
            borderColor="gray.100"
            _dark={{
              borderColor: 'gray.700',
            }}
          >
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <Flex gap={3}>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pose ta question à Okapi..."
                  bg={inputBg}
                  border="none"
                  _focus={{
                    boxShadow: '0 0 0 2px var(--chakra-colors-purple-500)',
                    bg: 'white',
                  }}
                  _hover={{
                    bg: 'white',
                  }}
                  borderRadius="xl"
                  size="lg"
                  fontSize="md"
                />
                <IconButton
                  aria-label="Envoyer"
                  icon={<FaPaperPlane />}
                  bgGradient={buttonGradient}
                  color="white"
                  size="lg"
                  isLoading={isLoading}
                  _hover={{
                    transform: 'scale(1.05)',
                    bgGradient: buttonGradient,
                  }}
                  _active={{
                    transform: 'scale(0.95)',
                  }}
                  borderRadius="xl"
                  onClick={() => handleSend()}
                />
              </Flex>
            </form>
          </Box>
        </Box>
      </MotionModalContent>
    </Modal>
  );
}; 