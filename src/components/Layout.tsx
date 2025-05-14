import { Box, Flex } from '@chakra-ui/react';
import { Footer } from './Footer';
import Navbar from './Navbar/Navbar';
import { useRouter } from 'next/router';
import { OkapiFloatingButton } from './okapi/OkapiFloatingButton';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <Flex minH="100vh" direction="column">
      <Navbar />
      <Box flex="1" pt={isHomePage ? '0' : '80px'}>
        {children}
      </Box>
      <Footer />
      <OkapiFloatingButton />
    </Flex>
  );
} 