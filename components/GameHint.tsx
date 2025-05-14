import { useState } from 'react';
import { Button, Text, useToast, Spinner, Box } from '@chakra-ui/react';
import { FaLightbulb } from 'react-icons/fa';

interface GameHintProps {
  gameContext: string;
  currentState: string;
}

export const GameHint = ({ gameContext, currentState }: GameHintProps) => {
  const [hint, setHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const getHint = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'hint',
          params: {
            gameContext,
            currentState,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'indice');
      }

      const data = await response.json();
      setHint(data.hint);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de générer un indice pour le moment',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Button
        leftIcon={<FaLightbulb />}
        onClick={getHint}
        isLoading={isLoading}
        loadingText="Génération de l'indice..."
        colorScheme="blue"
        variant="outline"
        size="sm"
      >
        Obtenir un indice
      </Button>

      {hint && (
        <Box mt={4} p={4} bg="blue.50" borderRadius="md">
          <Text>{hint}</Text>
        </Box>
      )}
    </Box>
  );
}; 