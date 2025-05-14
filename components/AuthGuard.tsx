import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Spinner, Center } from '@chakra-ui/react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      console.log('Pas de session, redirection vers login');
      router.replace('/auth/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <Container maxW="container.xl" py={10}>
        <Center h="100vh">
          <Spinner 
            size="xl" 
            color="purple.500" 
            thickness="4px"
            speed="0.65s"
          />
        </Center>
      </Container>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
} 