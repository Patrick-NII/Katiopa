import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Grid,
  Flex,
  Text,
  Image,
  useColorModeValue,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Progress,
  Input,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

interface DragExerciseProps {
  items: string[];
  onComplete: (isCorrect: boolean) => void;
}

export const DragExercise = ({ items, onComplete }: DragExerciseProps) => {
  const [draggedItems, setDraggedItems] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (item: string) => {
    setIsDragging(true);
  };

  const handleDragEnd = (item: string) => {
    setIsDragging(false);
    if (!draggedItems.includes(item)) {
      setDraggedItems([...draggedItems, item]);
    }
  };

  useEffect(() => {
    if (draggedItems.length === items.length) {
      const isCorrect = draggedItems.join('') === items.join('');
      onComplete(isCorrect);
    }
  }, [draggedItems]);

  return (
    <VStack spacing={8} w="full">
      <Flex
        wrap="wrap"
        gap={4}
        justify="center"
        p={4}
        bg={useColorModeValue('gray.100', 'gray.700')}
        borderRadius="xl"
      >
        {items.map((item, index) => (
          <MotionBox
            key={item}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.2 }}
            onDragStart={() => handleDragStart(item)}
            onDragEnd={() => handleDragEnd(item)}
            p={4}
            bg={useColorModeValue('white', 'gray.600')}
            borderRadius="md"
            boxShadow="md"
            cursor="grab"
            userSelect="none"
          >
            <Text fontSize="xl">{item}</Text>
          </MotionBox>
        ))}
      </Flex>

      <Flex
        w="full"
        h="100px"
        bg={useColorModeValue('gray.200', 'gray.600')}
        borderRadius="xl"
        justify="center"
        align="center"
        border="2px dashed"
        borderColor={useColorModeValue('gray.300', 'gray.500')}
      >
        <Text color="gray.500">Zone de dépôt</Text>
      </Flex>
    </VStack>
  );
};

interface MemoryExerciseProps {
  pairs: Array<{ question: string; answer: string }>;
  onComplete: (isCorrect: boolean) => void;
}

export const MemoryExercise = ({ pairs, onComplete }: MemoryExerciseProps) => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);

  const allCards = [...pairs.map(p => p.question), ...pairs.map(p => p.answer)];

  const handleCardClick = (index: number) => {
    if (!canFlip || flippedCards.includes(index) || matchedPairs.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      const [first, second] = newFlippedCards;
      const firstCard = allCards[first];
      const secondCard = allCards[second];

      if (pairs.some(p => 
        (p.question === firstCard && p.answer === secondCard) ||
        (p.answer === firstCard && p.question === secondCard)
      )) {
        setMatchedPairs([...matchedPairs, first, second]);
        setFlippedCards([]);
        setCanFlip(true);

        if (matchedPairs.length + 2 === allCards.length) {
          onComplete(true);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      gap={4}
      w="full"
      maxW="600px"
      mx="auto"
    >
      {allCards.map((card, index) => (
        <MotionBox
          key={index}
          initial={false}
          animate={{
            rotateY: flippedCards.includes(index) || matchedPairs.includes(index) ? 180 : 0,
            scale: matchedPairs.includes(index) ? 0.9 : 1,
          }}
          transition={{ duration: 0.3 }}
          w="full"
          h="120px"
          bg={useColorModeValue('white', 'gray.700')}
          borderRadius="lg"
          boxShadow="md"
          cursor={canFlip ? 'pointer' : 'default'}
          onClick={() => handleCardClick(index)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          transformStyle="preserve-3d"
        >
          <Box
            position="absolute"
            w="full"
            h="full"
            backfaceVisibility="hidden"
            bg={useColorModeValue('brand.500', 'brand.200')}
            borderRadius="lg"
          />
          <Box
            position="absolute"
            w="full"
            h="full"
            backfaceVisibility="hidden"
            transform="rotateY(180deg)"
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Text fontSize="sm">{card}</Text>
          </Box>
        </MotionBox>
      ))}
    </Grid>
  );
};

interface PuzzleExerciseProps {
  imageUrl: string;
  onComplete: (isCorrect: boolean) => void;
}

export const PuzzleExercise = ({ imageUrl, onComplete }: PuzzleExerciseProps) => {
  const [pieces, setPieces] = useState<number[]>(Array.from({ length: 9 }, (_, i) => i));
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);

  const handlePieceClick = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      const newPieces = [...pieces];
      const temp = newPieces[index];
      newPieces[index] = newPieces[selectedPiece];
      newPieces[selectedPiece] = temp;
      setPieces(newPieces);
      setSelectedPiece(null);

      // Vérifier si le puzzle est complété
      if (newPieces.every((piece, i) => piece === i)) {
        onComplete(true);
      }
    }
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2} w="full" maxW="300px" mx="auto">
      {pieces.map((piece, index) => (
        <Box
          key={index}
          position="relative"
          w="full"
          pb="100%"
          cursor="pointer"
          onClick={() => handlePieceClick(index)}
          border="2px solid"
          borderColor={selectedPiece === index ? 'brand.500' : 'transparent'}
          borderRadius="md"
          overflow="hidden"
        >
          <Image
            src={imageUrl}
            position="absolute"
            top={`${-Math.floor(piece / 3) * 100}%`}
            left={`${-(piece % 3) * 100}%`}
            w="300%"
            h="300%"
            objectFit="cover"
            transform={`scale(${1/3})`}
            transformOrigin="top left"
          />
        </Box>
      ))}
    </Grid>
  );
};

interface WordSearchProps {
  targetNumber: number;
  onComplete: (score: number) => void;
}

const WordSearch: React.FC<WordSearchProps> = ({ targetNumber, onComplete }) => {
  const [foundPairs, setFoundPairs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const toast = useToast();

  const possiblePairs = useMemo(() => {
    const pairs: string[] = [];
    for (let i = 0; i <= targetNumber; i++) {
      for (let j = 0; j <= targetNumber; j++) {
        if (i + j === targetNumber) {
          pairs.push(`${i} + ${j}`);
        }
      }
    }
    return pairs;
  }, [targetNumber]);

  const handlePairClick = (pair: string) => {
    if (!foundPairs.includes(pair)) {
      setFoundPairs([...foundPairs, pair]);
      setScore(score + 10);
      toast({
        title: 'Bonne réponse !',
        description: `Tu as trouvé ${pair} = ${targetNumber}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (foundPairs.length === possiblePairs.length) {
      onComplete(score);
    }
  }, [foundPairs, possiblePairs.length, score, onComplete]);

  return (
    <Box>
      <Heading size="md" mb={4}>
        Trouve toutes les additions qui donnent {targetNumber}
      </Heading>
      <SimpleGrid columns={[2, 3, 4]} spacing={4}>
        {possiblePairs.map((pair) => (
          <Button
            key={pair}
            onClick={() => handlePairClick(pair)}
            isDisabled={foundPairs.includes(pair)}
            colorScheme={foundPairs.includes(pair) ? 'green' : 'brand'}
            variant={foundPairs.includes(pair) ? 'solid' : 'outline'}
          >
            {pair}
          </Button>
        ))}
      </SimpleGrid>
      <Text mt={4} fontWeight="bold">
        Score: {score}
      </Text>
    </Box>
  );
};

interface LadderRaceProps {
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  onComplete: (score: number) => void;
}

const LadderRace: React.FC<LadderRaceProps> = ({ difficulty, onComplete }) => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [okapiPosition, setOkapiPosition] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<{ question: string; answer: number }>({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
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
      case 'expert':
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * 100);
        operation = Math.random() > 0.5 ? '+' : '-';
        break;
    }

    answer = operation === '+' ? num1 + num2 : num1 - num2;
    return {
      question: `${num1} ${operation} ${num2}`,
      answer
    };
  }, [difficulty]);

  useEffect(() => {
    setCurrentProblem(generateProblem());
  }, [generateProblem]);

  const handleAnswerSubmit = () => {
    const userAnswerNum = parseInt(userAnswer);
    if (userAnswerNum === currentProblem.answer) {
      const newPosition = playerPosition + 5;
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
      const newPosition = Math.max(0, playerPosition - 3);
      setPlayerPosition(newPosition);
      toast({
        title: 'Mauvaise réponse',
        description: 'Tu recules de 3 cases...',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

    // Okapi's turn
    setTimeout(() => {
      const okapiAnswer = Math.random() > 0.3; // 70% chance of correct answer
      if (okapiAnswer) {
        setOkapiPosition(prev => Math.min(prev + 5, 150));
      } else {
        setOkapiPosition(prev => Math.max(prev - 3, 0));
      }
    }, 1000);

    setUserAnswer('');
    setCurrentProblem(generateProblem());
  };

  useEffect(() => {
    if (playerPosition >= 150 || okapiPosition >= 150) {
      setGameOver(true);
      onComplete(score);
    }
  }, [playerPosition, okapiPosition, score, onComplete]);

  return (
    <Box>
      <Heading size="md" mb={4}>
        Course à l'échelle contre Okapi
      </Heading>
      
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Text fontWeight="bold">Toi: {playerPosition}/150</Text>
            <Progress value={(playerPosition / 150) * 100} colorScheme="green" />
          </Box>
          <Box>
            <Text fontWeight="bold">Okapi: {okapiPosition}/150</Text>
            <Progress value={(okapiPosition / 150) * 100} colorScheme="red" />
          </Box>
        </HStack>

        {!gameOver ? (
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
          <Box textAlign="center">
            <Heading size="lg" mb={4}>
              {playerPosition >= 150 ? 'Tu as gagné !' : 'Okapi a gagné...'}
            </Heading>
            <Text>Score final: {score}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

interface LudoGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (score: number) => void;
}

const LudoGame: React.FC<LudoGameProps> = ({ difficulty, onComplete }) => {
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