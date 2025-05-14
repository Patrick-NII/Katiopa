import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Image,
  Flex,
  Progress,
  Icon,
  useToast,
  Badge,
  SimpleGrid,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FaStar, FaTrophy, FaHeart, FaGem, FaMagic, FaBrain, FaLightbulb, FaChess, FaPuzzlePiece } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionText = motion(Text);

interface Sequence {
  type: 'number' | 'shape' | 'color' | 'pattern' | 'word' | 'chess';
  sequence: any[];
  answer: any;
  options: any[];
  difficulty: number;
  hint?: string;
}

interface GameState {
  score: number;
  level: number;
  lives: number;
  streak: number;
  currentSequence: Sequence | null;
  usedHints: number;
}

interface LogiQuestProps {
  onComplete: (score: number) => void;
}

const generateNumberSequence = (difficulty: number): Sequence => {
  const types = [
    'arithmetic', // Suite arithmétique
    'geometric',  // Suite géométrique
    'fibonacci',  // Suite de Fibonacci
    'prime',      // Nombres premiers
    'square',     // Carrés parfaits
  ];
  
  const type = types[Math.floor(Math.random() * types.length)];
  let sequence: number[] = [];
  let answer: number;
  
  switch (type) {
    case 'arithmetic':
      const commonDiff = Math.floor(Math.random() * 5) + 1;
      const start = Math.floor(Math.random() * 10);
      sequence = [start, start + commonDiff, start + 2 * commonDiff];
      answer = start + 3 * commonDiff;
      break;
    case 'geometric':
      const ratio = Math.floor(Math.random() * 3) + 2;
      const geoStart = Math.floor(Math.random() * 5) + 1;
      sequence = [geoStart, geoStart * ratio, geoStart * ratio * ratio];
      answer = geoStart * ratio * ratio * ratio;
      break;
    case 'fibonacci':
      sequence = [1, 1, 2, 3];
      answer = 5;
      break;
    case 'prime':
      sequence = [2, 3, 5, 7];
      answer = 11;
      break;
    case 'square':
      const base = Math.floor(Math.random() * 5) + 1;
      sequence = [base * base, (base + 1) * (base + 1), (base + 2) * (base + 2)];
      answer = (base + 3) * (base + 3);
      break;
  }
  
  const options = [answer];
  while (options.length < 4) {
    const option = Math.floor(Math.random() * 50) + 1;
    if (!options.includes(option)) {
      options.push(option);
    }
  }
  
  return {
    type: 'number',
    sequence,
    answer,
    options: options.sort(() => Math.random() - 0.5),
    difficulty,
    hint: `Type: ${type}`,
  };
};

const generateShapeSequence = (difficulty: number): Sequence => {
  const shapes = ['▲', '■', '●', '◆', '★'];
  const rotations = ['↑', '→', '↓', '←'];
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  
  const type = Math.random() > 0.5 ? 'rotation' : 'color';
  let sequence: string[] = [];
  let answer: string;
  
  if (type === 'rotation') {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    sequence = rotations.map(rot => `${shape}${rot}`);
    answer = `${shape}${rotations[0]}`;
  } else {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    sequence = colors.map(color => `${shape}${color}`);
    answer = `${shape}${colors[0]}`;
  }
  
  const options = [answer];
  while (options.length < 4) {
    const option = `${shapes[Math.floor(Math.random() * shapes.length)]}${
      type === 'rotation' 
        ? rotations[Math.floor(Math.random() * rotations.length)]
        : colors[Math.floor(Math.random() * colors.length)]
    }`;
    if (!options.includes(option)) {
      options.push(option);
    }
  }
  
  return {
    type: 'shape',
    sequence,
    answer,
    options: options.sort(() => Math.random() - 0.5),
    difficulty,
    hint: `Type: ${type}`,
  };
};

const generateChessSequence = (difficulty: number): Sequence => {
  const pieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
  const moves = ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'];
  
  const type = Math.random() > 0.5 ? 'piece' : 'move';
  let sequence: string[] = [];
  let answer: string;
  
  if (type === 'piece') {
    sequence = pieces.slice(0, 3);
    answer = pieces[3];
  } else {
    sequence = moves.slice(0, 3);
    answer = moves[3];
  }
  
  const options = [answer];
  while (options.length < 4) {
    const option = type === 'piece'
      ? pieces[Math.floor(Math.random() * pieces.length)]
      : moves[Math.floor(Math.random() * moves.length)];
    if (!options.includes(option)) {
      options.push(option);
    }
  }
  
  return {
    type: 'chess',
    sequence,
    answer,
    options: options.sort(() => Math.random() - 0.5),
    difficulty,
    hint: `Type: ${type}`,
  };
};

const LogiQuest: React.FC<LogiQuestProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    lives: 3,
    streak: 0,
    currentSequence: null,
    usedHints: 0,
  });
  
  const [showHint, setShowHint] = useState(false);
  const toast = useToast();
  
  const generateSequence = (): Sequence => {
    const types = ['number', 'shape', 'chess'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
      case 'number':
        return generateNumberSequence(gameState.level);
      case 'shape':
        return generateShapeSequence(gameState.level);
      case 'chess':
        return generateChessSequence(gameState.level);
      default:
        return generateNumberSequence(gameState.level);
    }
  };
  
  const handleAnswer = (selectedAnswer: any) => {
    if (!gameState.currentSequence) return;
    
    const isCorrect = selectedAnswer === gameState.currentSequence.answer;
    
    if (isCorrect) {
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10 * (prev.streak + 1),
        streak: prev.streak + 1,
        currentSequence: generateSequence(),
      }));
      
      toast({
        title: 'Correct !',
        description: 'Bonne réponse !',
        status: 'success',
        duration: 2000,
      });
    } else {
      setGameState(prev => ({
        ...prev,
        lives: prev.lives - 1,
        streak: 0,
        currentSequence: generateSequence(),
      }));
      
      toast({
        title: 'Incorrect !',
        description: `La bonne réponse était ${gameState.currentSequence.answer}`,
        status: 'error',
        duration: 2000,
      });
    }
    
    setShowHint(false);
  };
  
  const useHint = () => {
    if (gameState.usedHints < 3) {
      setShowHint(true);
      setGameState(prev => ({
        ...prev,
        usedHints: prev.usedHints + 1,
      }));
    } else {
      toast({
        title: 'Plus d\'indices',
        description: 'Vous avez utilisé tous vos indices',
        status: 'warning',
        duration: 2000,
      });
    }
  };
  
  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      currentSequence: generateSequence(),
    }));
  }, []);

  useEffect(() => {
    if (gameState.lives === 0) {
      onComplete(gameState.score);
    }
  }, [gameState.lives, gameState.score, onComplete]);
  
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, purple.900, blue.900)"
      color="white"
      p={8}
    >
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start">
            <HStack>
              <Icon as={FaBrain} boxSize={6} />
              <Text fontSize="2xl">LogiQuest</Text>
            </HStack>
            <HStack>
              <Icon as={FaHeart} color="red.500" />
              <Text>Vies: {gameState.lives}</Text>
            </HStack>
          </VStack>
          
          <VStack align="end">
            <Text>Score: {gameState.score}</Text>
            <Text>Niveau: {gameState.level}</Text>
            <Text>Streak: {gameState.streak}</Text>
          </VStack>
        </HStack>
        
        {/* Game Area */}
        {gameState.currentSequence && (
          <VStack spacing={6}>
            <Heading size="lg">
              Trouvez la suite logique
            </Heading>
            
            <HStack spacing={4}>
              {gameState.currentSequence.sequence.map((item, index) => (
                <MotionBox
                  key={index}
                  p={4}
                  bg="whiteAlpha.200"
                  borderRadius="md"
                  whileHover={{ scale: 1.05 }}
                >
                  <Text fontSize="2xl">{item}</Text>
                </MotionBox>
              ))}
              <MotionBox
                p={4}
                bg="whiteAlpha.100"
                borderRadius="md"
                whileHover={{ scale: 1.05 }}
              >
                <Text fontSize="2xl">?</Text>
              </MotionBox>
            </HStack>
            
            {showHint && gameState.currentSequence.hint && (
              <Text color="yellow.400">
                Indice: {gameState.currentSequence.hint}
              </Text>
            )}
            
            <SimpleGrid columns={2} spacing={4} w="full">
              {gameState.currentSequence.options.map((option, index) => (
                <MotionBox
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    w="full"
                    h="20"
                    onClick={() => handleAnswer(option)}
                    bgGradient="linear(to-r, blue.400, blue.600)"
                  >
                    <Text fontSize="2xl">{option}</Text>
                  </Button>
                </MotionBox>
              ))}
            </SimpleGrid>
            
            <Button
              leftIcon={<FaLightbulb />}
              onClick={useHint}
              colorScheme="yellow"
              isDisabled={gameState.usedHints >= 3}
            >
              Utiliser un indice ({3 - gameState.usedHints} restants)
            </Button>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default LogiQuest; 