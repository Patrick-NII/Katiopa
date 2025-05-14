import {
  Box,
  IconButton,
  useDisclosure,
  useColorModeValue,
  VStack,
  Text,
  Badge,
  useToast,
  Button,
  HStack,
  Avatar,
  Input,
  FormControl,
  Icon,
} from '@chakra-ui/react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useSubscription } from '../../hooks/useSubscription';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function OkapiFloatingButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const { subscription } = useSubscription();
  const toast = useToast();
  const bgColor = useColorModeValue('purple.500', 'purple.400');
  const chatBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // Simuler des suggestions aléatoires
    const suggestionTimer = setInterval(() => {
      const randomSuggestions = [
        "Voulez-vous voir les dernières activités pour enfants ?",
        "Découvrez nos nouveaux jeux éducatifs !",
        "Besoin d'aide pour organiser une activité ?",
      ];
      const randomIndex = Math.floor(Math.random() * randomSuggestions.length);
      setSuggestions(prev => [...prev, randomSuggestions[randomIndex]]);
      setNotificationCount(prev => prev + 1);
    }, 30000); // Toutes les 30 secondes

    return () => clearInterval(suggestionTimer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Envoi du message:', userMessage);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [userMessage], // Envoyer uniquement le message actuel
        }),
      });

      const contentType = response.headers.get('content-type');
      console.log('Type de contenu reçu:', contentType);
      
      if (!response.ok) {
        let errorMessage = 'Erreur de communication avec le serveur';
        try {
          if (contentType?.includes('application/json')) {
            const errorData = await response.json();
            console.error('Erreur JSON reçue:', errorData);
            errorMessage = errorData.details || errorData.message || errorMessage;
          } else {
            const textError = await response.text();
            console.error('Erreur texte reçue:', textError);
          }
        } catch (parseError) {
          console.error('Erreur lors du parsing de l\'erreur:', parseError);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Réponse reçue:', data);

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });

      // Ajouter un message d'erreur dans le chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Désolé, j'ai rencontré une erreur. Veuillez réessayer dans quelques instants."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessages(prev => [...prev, { role: 'assistant', content: suggestion }]);
    setSuggestions(prev => prev.filter(s => s !== suggestion));
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex={1000}
    >
      {isOpen ? (
        <Box
          w="300px"
          h="400px"
          bg={chatBg}
          borderRadius="xl"
          boxShadow="xl"
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Box
            bg={bgColor}
            color="white"
            p={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack>
              <Avatar
                size="sm"
                name="Okapi"
                src="/okapi-avatar.png"
                bg="white"
              />
              <Text fontWeight="bold">Okapi</Text>
            </HStack>
            <IconButton
              aria-label="Fermer le chat"
              icon={<FaTimes />}
              size="sm"
              variant="ghost"
              color="white"
              onClick={onClose}
            />
          </Box>

          <Box
            flex={1}
            overflowY="auto"
            p={4}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'gray.200',
                borderRadius: '24px',
              },
            }}
          >
            <Box>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  mb={4}
                  display="flex"
                  flexDirection={message.role === 'user' ? 'row-reverse' : 'row'}
                  alignItems="flex-start"
                >
                  <Avatar
                    size="xs"
                    name={message.role === 'user' ? 'Vous' : 'Okapi'}
                    src={message.role === 'user' ? undefined : '/okapi-avatar.png'}
                    bg={message.role === 'user' ? 'purple.500' : 'gray.500'}
                    color="white"
                  />
                  <Box
                    ml={message.role === 'user' ? 0 : 2}
                    mr={message.role === 'user' ? 2 : 0}
                    maxW="80%"
                  >
                    <Box
                      p={2}
                      bg={message.role === 'user' ? 'purple.50' : 'gray.50'}
                      _dark={{
                        bg: message.role === 'user' ? 'purple.900' : 'gray.700',
                      }}
                      borderRadius="lg"
                    >
                      <Text fontSize="sm">{message.content}</Text>
                    </Box>
                  </Box>
                </Box>
              ))}
              {isLoading && (
                <Box display="flex" justifyContent="center" mb={4}>
                  <Icon as={FaRobot} color="purple.500" />
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>
          </Box>

          <Box p={3} borderTopWidth={1} borderTopColor="gray.200">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <HStack>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Écrivez votre message..."
                    size="sm"
                    bg="gray.50"
                    _dark={{ bg: 'gray.700' }}
                    _hover={{ bg: 'gray.100', _dark: { bg: 'gray.600' } }}
                    _focus={{
                      bg: 'white',
                      _dark: { bg: 'gray.600' },
                      boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
                    }}
                    transition="all 0.2s"
                    border="none"
                  />
                  <IconButton
                    type="submit"
                    aria-label="Envoyer"
                    icon={<FaPaperPlane />}
                    colorScheme="purple"
                    size="sm"
                    isLoading={isLoading}
                    isDisabled={!input.trim()}
                  />
                </HStack>
              </FormControl>
            </form>
          </Box>
        </Box>
      ) : (
        <Box position="relative">
          {notificationCount > 0 && (
            <Badge
              position="absolute"
              top="-8px"
              right="-8px"
              colorScheme="green"
              borderRadius="full"
              px={2}
              py={1}
            >
              {notificationCount}
            </Badge>
          )}
          <IconButton
            aria-label="Parler avec Okapi"
            icon={<FaRobot />}
            size="lg"
            colorScheme="purple"
            bg={bgColor}
            color="white"
            borderRadius="full"
            boxShadow="lg"
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: 'xl',
            }}
            transition="all 0.2s"
            onClick={onOpen}
            animation="bounce 2s infinite"
            css={`
              @keyframes bounce {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
            `}
          />
        </Box>
      )}
    </Box>
  );
} 