import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  useToast,
  Avatar,
  HStack,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function OkapiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la communication avec Okapi');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack
      h="100%"
      w="100%"
      spacing={4}
      p={4}
      bg="white"
      _dark={{ bg: 'gray.800' }}
      borderRadius="xl"
      boxShadow="sm"
    >
      <Box
        flex={1}
        w="100%"
        overflowY="auto"
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
        {messages.map((message, index) => (
          <Flex
            key={index}
            mb={4}
            direction={message.role === 'user' ? 'row-reverse' : 'row'}
            align="flex-start"
          >
            <Avatar
              size="sm"
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
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: 'gray.400' }}
                mb={1}
              >
                {message.role === 'user' ? 'Vous' : 'Okapi'}
              </Text>
              <Box
                p={3}
                bg={message.role === 'user' ? 'purple.50' : 'gray.50'}
                _dark={{
                  bg: message.role === 'user' ? 'purple.900' : 'gray.700',
                }}
                borderRadius="lg"
              >
                <Text fontSize="sm">{message.content}</Text>
              </Box>
            </Box>
          </Flex>
        ))}
        {isLoading && (
          <Flex justify="center" mb={4}>
            <Spinner size="sm" color="purple.500" />
          </Flex>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <HStack spacing={2}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question à Okapi..."
            size="md"
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
            size="md"
            isLoading={isLoading}
            isDisabled={!input.trim()}
          />
        </HStack>
      </form>
    </VStack>
  );
} 