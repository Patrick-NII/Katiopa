import { Box, Heading, Text, Container } from '@chakra-ui/react';

export default function EspacePersonnelTest() {
  return (
    <Container maxW="container.md" py={20}>
      <Box textAlign="center" p={8} borderRadius="xl" boxShadow="lg" bg="whiteAlpha.900">
        <Heading color="brand.600" mb={4}>Espace Personnel (Test)</Heading>
        <Text fontSize="xl" color="gray.600">
          Ceci est une page de test pour vérifier l'accès à l'espace personnel.
        </Text>
      </Box>
    </Container>
  );
} 