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
  Flex,
  Icon,
  ScaleFade,
  Image,
  useColorModeValue,
  Badge,
  Container,
  Tooltip,
} from '@chakra-ui/react';
import { FaClock, FaTrophy, FaStar, FaCalculator, FaRedo, FaCoins, FaQuestionCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { GameInterface } from 'components/games/GameInterface';
import GameTheme from 'components/games/GameTheme';
import { Theme } from 'components/games/Theme';
import { Avatar } from 'components/games/Avatar';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface CalculationGameProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (score: number) => void;
}

interface Problem {
  question: string;
  answer: number;
  numbers: number[];
  operations: string[];
  explanation?: string;
}

export const CalculationGame: React.FC<CalculationGameProps> = ({ difficulty, onComplete }) => {
  const [currentProblem, setCurrentProblem] = useState<Problem>({
    question: '',
    answer: 0,
    numbers: [],
    operations: [],
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [coins, setCoins] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const toast = useToast();

  const generateProblem = useCallback(() => {
    let numbers: number[] = [];
    let operations: string[] = [];
    let answer = 0;
    let explanation = '';

    switch (difficulty) {
      case 'easy':
        numbers = Array.from({ length: 2 }, () => Math.floor(Math.random() * 10) + 1);
        operations = [Math.random() > 0.5 ? '+' : '-'];
        break;
      case 'medium':
        numbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 20) + 1);
        operations = Array.from({ length: 2 }, () => (Math.random() > 0.5 ? '+' : '-'));
        break;
      case 'hard':
        numbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 50) + 1);
        operations = Array.from({ length: 3 }, () => (Math.random() > 0.5 ? '+' : '-'));
        break;
    }

    // Calculate answer and generate explanation
    answer = numbers.reduce((acc, num, index) => {
      if (index === 0) return num;
      const op = operations[index - 1];
      return op === '+' ? acc + num : acc - num;
    }, 0);

    // Generate explanation
    explanation = numbers.reduce((str, num, index) => {
      if (index === 0) return `${num}`;
      const op = operations[index - 1];
      return `${str} ${op} ${num}`;
    }, '');

    // Ensure positive answer for subtraction
    if (answer < 0) {
      const lastOpIndex = operations.lastIndexOf('-');
      if (lastOpIndex !== -1) {
        operations[lastOpIndex] = '+';
        answer = numbers.reduce((acc, num, index) => {
          if (index === 0) return num;
          const op = operations[index - 1];
          return op === '+' ? acc + num : acc - num;
        }, 0);
      }
    }

    const question = numbers.reduce((str, num, index) => {
      if (index === 0) return num.toString();
      return `${str} ${operations[index - 1]} ${num}`;
    }, '');

    return {
      question,
      answer,
      numbers,
      operations,
      explanation,
    };
  }, [difficulty]);

  useEffect(() => {
    if (!gameOver) {
      setCurrentProblem(generateProblem());
    }
  }, [gameOver, generateProblem]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      onComplete(score);
    }
  }, [timeLeft, gameOver, score, onComplete]);

  const handleAnswerSubmit = () => {
    const userAnswerNum = parseInt(userAnswer);
    if (userAnswerNum === currentProblem.answer) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 10 + (newStreak * 2); // Bonus points for streaks
      const earnedCoins = Math.floor(points / 2); // Convert points to coins
      setScore(score + points);
      setCoins(coins + earnedCoins);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
      toast({
        title: 'Bonne réponse !',
        description: `+${points} points et ${earnedCoins} pièces ! (${newStreak} en série)`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    } else {
      setStreak(0);
      toast({
        title: 'Mauvaise réponse',
        description: `La réponse était ${currentProblem.answer}. ${currentProblem.explanation}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

    setUserAnswer('');
    setCurrentProblem(generateProblem());
  };

  const resetGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setStreak(0);
    setShowCelebration(false);
    setUserAnswer('');
    setCurrentProblem(generateProblem());
  }, [generateProblem]);

  return (
    <GameInterface
      title="Calcul Express"
      description="Résous les opérations le plus vite possible !"
      difficulty={difficulty}
      type="calculation"
      score={score}
      timeLeft={timeLeft}
      totalTime={30}
      onComplete={onComplete}
      theme={selectedTheme}
    >
      <ScaleFade in={!gameOver} initialScale={0.9}>
        <VStack spacing={6}>
          <HStack justify="space-between" w="full">
            <HStack>
              <Icon as={FaCoins} color="yellow.500" />
              <Text fontWeight="bold">{coins} pièces</Text>
            </HStack>
            <GameTheme
              coins={coins}
              onThemeChange={setSelectedTheme}
              onAvatarChange={setSelectedAvatar}
            />
          </HStack>

          {selectedAvatar && (
            <MotionBox
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={selectedAvatar.image}
                alt={selectedAvatar.name}
                boxSize="100px"
                borderRadius="full"
                boxShadow="lg"
              />
            </MotionBox>
          )}

          <MotionBox
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Text
              fontSize="5xl"
              fontWeight="bold"
              textAlign="center"
              bgGradient={selectedTheme ? `linear(to-r, ${selectedTheme.colors.primary}, ${selectedTheme.colors.secondary})` : 'linear(to-r, brand.500, secondary.500)'}
              bgClip="text"
            >
              {currentProblem.question} = ?
            </Text>
          </MotionBox>

          <HStack spacing={4} justify="center">
            {currentProblem.numbers.map((num, index) => (
              <MotionBox
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge
                  colorScheme="brand"
                  fontSize="2xl"
                  px={4}
                  py={2}
                  borderRadius="full"
                >
                  {num}
                </Badge>
              </MotionBox>
            ))}
          </HStack>

          <HStack spacing={4} w="full">
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Ta réponse"
              size="lg"
              autoFocus
              variant="filled"
              _focus={{
                borderColor: selectedTheme?.colors.primary || 'brand.500',
                boxShadow: `0 0 0 1px ${selectedTheme?.colors.primary || 'brand.500'}`,
              }}
            />
            <Tooltip label="Aide" placement="top">
              <Button
                onClick={() => setShowHelp(!showHelp)}
                colorScheme="gray"
                size="lg"
              >
                <Icon as={FaQuestionCircle} />
              </Button>
            </Tooltip>
          </HStack>

          {showHelp && (
            <ScaleFade in={showHelp}>
              <Box
                p={4}
                bg="gray.100"
                borderRadius="md"
                color="gray.700"
              >
                <Text>{currentProblem.explanation}</Text>
              </Box>
            </ScaleFade>
          )}

          <Button
            colorScheme="brand"
            onClick={handleAnswerSubmit}
            isDisabled={!userAnswer}
            size="lg"
            w="full"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Valider
          </Button>

          {streak > 0 && (
            <MotionFlex
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              align="center"
              color="yellow.500"
            >
              <Icon as={FaStar} mr={2} />
              <Text fontWeight="bold">
                {streak} en série !
              </Text>
            </MotionFlex>
          )}
        </VStack>
      </ScaleFade>

      {gameOver && (
        <ScaleFade in={gameOver} initialScale={0.9}>
          <VStack spacing={6} textAlign="center">
            <Heading size="lg" color="brand.500">
              Temps écoulé !
            </Heading>
            <Text fontSize="xl">
              Score final: {score} points
            </Text>
            {streak > 0 && (
              <Text color="yellow.500">
                Meilleure série: {streak}
              </Text>
            )}
            <Text color="green.500">
              Pièces gagnées: {Math.floor(score / 2)}
            </Text>
            <Button
              leftIcon={<Icon as={FaRedo} />}
              colorScheme="brand"
              size="lg"
              onClick={resetGame}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Rejouer
            </Button>
          </VStack>
        </ScaleFade>
      )}
    </GameInterface>
  );
}; 