import { Box, Container, Flex, Text, Link, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)');
  const shadow = useColorModeValue('0 -4px 6px rgba(0, 0, 0, 0.1)', '0 -4px 6px rgba(0, 0, 0, 0.3)');
  const linkColor = useColorModeValue('brand.500', 'brand.300');
  const linkHoverColor = useColorModeValue('brand.600', 'brand.200');

  return (
    <Box as="footer" bg={bgColor} py={8} mt="auto" boxShadow={shadow} borderRadius="16px 16px 0 0" backdropFilter="blur(10px)">
      <Container maxW="container.xl">
        <Flex direction="column" align="center" gap={4}>
          <Flex gap={4}>
            <Link fontFamily="body" color={linkColor} _hover={{ color: linkHoverColor, textDecoration: 'underline' }} href="/privacy">Politique de confidentialité</Link>
            <Link fontFamily="body" color={linkColor} _hover={{ color: linkHoverColor, textDecoration: 'underline' }} href="/terms">Conditions d'utilisation</Link>
            <Link fontFamily="body" color={linkColor} _hover={{ color: linkHoverColor, textDecoration: 'underline' }} href="/contact">Contact</Link>
          </Flex>
          <Text fontFamily="body" color="gray.600">
            © {new Date().getFullYear()} Katiopa. Tous droits réservés.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer; 