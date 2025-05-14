import { Box, ChakraProvider, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Container maxW="container.xl" py={8}>
          {children}
        </Container>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default MainLayout; 