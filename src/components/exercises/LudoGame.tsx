import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Heading,
  Progress,
  useToast,
} from '@chakra-ui/react';

interface LudoGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (score: number) => void;
}

export const LudoGame: React.FC<LudoGameProps> = ({ difficulty, onComplete }) => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [okapiPosition, setOkapiPosition] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<{ question: string; answer: number }>({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'okapi'>('player');
  const toast = useToast();

  const generateProblem = useCallback(() => {
    let num1, num2, operation, answer;
    
    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
        operation = Math.random() > 0.5 ? '+' : '-';
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 20);
        num2 = Math.floor(Math.random() * 20);
        operation = Math.random() > 0.5 ? '+' : '-';
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 50);
        num2 = Math.floor(Math.random() * 50);
        operation = Math.random() > 0.5 ? '+' : '-';
        break;
    }

    // Pour les soustractions, s'assurer que le résultat est positif
    if (operation === '-' && num1 < num2) {
      [num1, num2] = [num2, num1];
    }

    answer = operation === '+' ? num1 + num2 : num1 - num2;
    return {
      question: `${num1} ${operation} ${num2}`,
      answer
    };
  }, [difficulty]);

  useEffect(() => {
    if (currentPlayer === 'player') {
      setCurrentProblem(generateProblem());
    } else {
      // Tour d'Okapi
      setTimeout(() => {
        const okapiAnswer = Math.random() > 0.3; // 70% de chance de bonne réponse
        if (okapiAnswer) {
          const newPosition = Math.min(okapiPosition + 5, 100);
          setOkapiPosition(newPosition);
          toast({
            title: 'Okapi avance !',
            description: 'Okapi a trouvé la bonne réponse',
            status: 'info',
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Okapi se trompe',
            description: 'Okapi n\'a pas trouvé la bonne réponse',
            status: 'warning',
            duration: 2000,
            isClosable: true,
          });
        }
        setCurrentPlayer('player');
        setCurrentProblem(generateProblem());
      }, 1500);
    }
  }, [currentPlayer, okapiPosition, generateProblem, toast]);

  const handleAnswerSubmit = () => {
    const userAnswerNum = parseInt(userAnswer);
    if (userAnswerNum === currentProblem.answer) {
      const newPosition = Math.min(playerPosition + 5, 100);
      setPlayerPosition(newPosition);
      setScore(score + 10);
      toast({
        title: 'Bonne réponse !',
        description: 'Tu avances de 5 cases !',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Mauvaise réponse',
        description: 'Essaie encore !',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

    setUserAnswer('');
    setCurrentPlayer('okapi');
  };

  useEffect(() => {
    if (playerPosition >= 100 || okapiPosition >= 100) {
      setGameOver(true);
      onComplete(score);
    }
  }, [playerPosition, okapiPosition, score, onComplete]);

  return (
    <Box>
      <Heading size="md" mb={4}>
        Ludo Mathématique
      </Heading>
      
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Text fontWeight="bold">Toi: {playerPosition}/100</Text>
            <Progress value={(playerPosition / 100) * 100} colorScheme="green" />
          </Box>
          <Box>
            <Text fontWeight="bold">Okapi: {okapiPosition}/100</Text>
            <Progress value={(okapiPosition / 100) * 100} colorScheme="red" />
          </Box>
        </HStack>

        {!gameOver ? (
          <>
            {currentPlayer === 'player' ? (
              <>
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                  {currentProblem.question} = ?
                </Text>
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Ta réponse"
                  size="lg"
                />
                <Button
                  colorScheme="brand"
                  onClick={handleAnswerSubmit}
                  isDisabled={!userAnswer}
                >
                  Valider
                </Button>
              </>
            ) : (
              <Text fontSize="xl" textAlign="center">
                C'est au tour d'Okapi...
              </Text>
            )}
          </>
        ) : (
          <Box textAlign="center">
            <Heading size="lg" mb={4}>
              {playerPosition >= 100 ? 'Tu as gagné !' : 'Okapi a gagné...'}
            </Heading>
            <Text>Score final: {score}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}; 