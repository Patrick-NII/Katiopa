import { Box, Container, Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="white" py={8} mt="auto">
      <Container maxW="container.xl">
        <Flex direction="column" align="center" gap={4}>
          <Flex gap={4}>
            <Link href="/privacy">Politique de confidentialité</Link>
            <Link href="/terms">Conditions d'utilisation</Link>
            <Link href="/contact">Contact</Link>
          </Flex>
          <Text color="gray.600">
            © {new Date().getFullYear()} Katiopa. Tous droits réservés.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer; 