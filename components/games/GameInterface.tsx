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
  Image,
  useColorModeValue,
  Container,
  Badge,
  ScaleFade,
  Fade,
  SlideFade,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaClock, FaTrophy, FaStar, FaGamepad, FaCalculator } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const sparkle = keyframes`
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(0); }
`;

interface GameInterfaceProps {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'ludo' | 'calculation';
  children: React.ReactNode;
  score: number;
  timeLeft?: number;
  totalTime?: number;
  onComplete: (score: number) => void;
}

export const GameInterface: React.FC<GameInterfaceProps> = ({
  title,
  description,
  difficulty,
  type,
  children,
  score,
  timeLeft,
  totalTime,
  onComplete,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const [showCelebration, setShowCelebration] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'hard':
        return 'red';
      default:
        return 'gray';
    }
  };

  const difficultyText = {
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
  };

  return (
    <Container maxW="container.md" py={8}>
      <ScaleFade in={true} initialScale={0.9}>
        <Box
          bg={bgColor}
          borderRadius="2xl"
          boxShadow="xl"
          p={8}
          borderWidth="1px"
          borderColor={borderColor}
          position="relative"
          overflow="hidden"
        >
          {/* Background decoration */}
          <Box
            position="absolute"
            top={0}
            right={0}
            w="200px"
            h="200px"
            bgGradient="linear(to-br, brand.500, secondary.500)"
            opacity={0.1}
            borderRadius="full"
            transform="translate(50%, -50%)"
          />

          <VStack spacing={6} align="stretch">
            {/* Header */}
            <Flex justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon
                  as={type === 'ludo' ? FaGamepad : FaCalculator}
                  boxSize={8}
                  color="brand.500"
                  animation={`${float} 3s ease-in-out infinite`}
                />
                <Box>
                  <Heading size="lg">{title}</Heading>
                  <Text color={textColor}>{description}</Text>
                </Box>
              </HStack>
              <Badge
                colorScheme={getDifficultyColor(difficulty)}
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                animation={`${pulse} 2s ease-in-out infinite`}
              >
                {difficultyText[difficulty]}
              </Badge>
            </Flex>

            {/* Stats */}
            <HStack justify="space-between" spacing={4}>
              {timeLeft !== undefined && totalTime !== undefined && (
                <Flex
                  align="center"
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  px={4}
                  py={2}
                  borderRadius="full"
                >
                  <Icon as={FaClock} mr={2} color="brand.500" />
                  <Text fontWeight="bold">
                    {timeLeft}s
                  </Text>
                </Flex>
              )}
              <Flex
                align="center"
                bg={useColorModeValue('gray.50', 'gray.700')}
                px={4}
                py={2}
                borderRadius="full"
              >
                <Icon as={FaTrophy} mr={2} color="yellow.500" />
                <Text fontWeight="bold">{score} points</Text>
              </Flex>
            </HStack>

            {/* Progress bar */}
            {timeLeft !== undefined && totalTime !== undefined && (
              <Progress
                value={(timeLeft / totalTime) * 100}
                colorScheme="brand"
                size="sm"
                borderRadius="full"
                hasStripe
                isAnimated
              />
            )}

            {/* Game content */}
            <Box py={4}>
              {children}
            </Box>

            {/* Celebration effect */}
            <AnimatePresence>
              {showCelebration && (
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgGradient="linear(to-br, brand.500, secondary.500)"
                  opacity={0.1}
                  zIndex={-1}
                >
                  {[...Array(20)].map((_, i) => (
                    <MotionBox
                      key={i}
                      position="absolute"
                      top={`${Math.random() * 100}%`}
                      left={`${Math.random() * 100}%`}
                      w="20px"
                      h="20px"
                      bg="yellow.400"
                      borderRadius="full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.2, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </MotionBox>
              )}
            </AnimatePresence>
          </VStack>
        </Box>
      </ScaleFade>
    </Container>
  );
}; 