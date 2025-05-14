import { Box, ChakraProvider, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import StripeBackground from '@/components/ui/StripeBackground';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ChakraProvider>
      <StripeBackground>
        <Box minH="100vh" position="relative" zIndex="1">
        <Header />
        <Container maxW="container.xl" py={8}>
          {children}
        </Container>
        <Footer />
      </Box>
      </StripeBackground>
    </ChakraProvider>
  );
};

export default MainLayout; 