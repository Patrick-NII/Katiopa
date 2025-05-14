import { Box, Container, Flex } from '@chakra-ui/react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  
  // Pages où le footer ne doit pas apparaître
  const noFooterPages = [
    '/connexion',
    '/inscription',
    '/espace-personnel',
    '/auth/login',
    '/auth/register'
  ];
  const shouldShowFooter = !noFooterPages.includes(router.pathname);

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box as="main" flex="1" py={8}>
        <Container maxW="container.xl" h="full">
          {children}
        </Container>
      </Box>
      {shouldShowFooter && <Footer />}
    </Flex>
  );
} 