import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import OkapiChat from '../components/chat/OkapiChat';

export default function ChatPage() {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" color="gray.800" _dark={{ color: 'white' }} fontWeight="semibold">
            Okapi, votre assistant parental
          </Heading>
          <Text color="gray.500" _dark={{ color: 'gray.400' }} mt={2} fontSize="sm">
            Posez vos questions sur l'éducation et la gestion des enfants
          </Text>
        </Box>

        <Box h="600px">
          <OkapiChat />
        </Box>
      </VStack>
    </Container>
  );
} 