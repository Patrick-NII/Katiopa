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
} from '@chakra-ui/react';
import { FaStar, FaTrophy, FaHeart, FaGem, FaMagic, FaCalculator, FaCrown, FaBolt, FaShieldAlt, FaClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionText = motion(Text);

// Animation variants
const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const sparkleAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: [0, 1, 0],
    scale: [0.5, 1.2, 0.5],
    transition: {
      duration: 1,
      repeat: 0
    }
  }
};

interface MathProblem {
  question: string;
  answer: number;
  options: number[];
  type: 'addition' | 'soustraction' | 'multiplication' | 'division';
  difficulty: number;
}

interface Character {
  name: string;
  health: number;
  level: number;
  xp: number;
  items: string[];
}

interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: any;
  effect: () => void;
  cooldown: number;
  isActive: boolean;
}

interface DailyChallenge {
  id: string;
  description: string;
  reward: number;
  completed: boolean;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  level: number;
  date: string;
}

const MathAdventure: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [character, setCharacter] = useState<Character>({
    name: 'MathHero',
    health: 100,
    level: 1,
    xp: 0,
    items: [],
  });
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'levelUp' | 'gameOver'>('playing');
  const [animations, setAnimations] = useState<string[]>([]);
  const toast = useToast();
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [powerUpsUsed, setPowerUpsUsed] = useState(0);
  const [isDoubleXPActive, setIsDoubleXPActive] = useState(false);
  const [isTimeFrozen, setIsTimeFrozen] = useState(false);
  const [hasShield, setHasShield] = useState(false);

  const [powerUps, setPowerUps] = useState<PowerUp[]>([
    {
      id: 'double-xp',
      name: 'Double XP',
      description: 'Gagnez le double d\'XP pendant 30 secondes',
      icon: FaStar,
      effect: () => {
        setIsDoubleXPActive(true);
        toast({
          title: 'Double XP Activé !',
          description: 'Vous gagnez le double d\'XP pendant 30 secondes',
          status: 'success',
          duration: 2000,
        });
        setTimeout(() => {
          setIsDoubleXPActive(false);
          toast({
            title: 'Double XP Terminé',
            description: 'Le bonus d\'XP est terminé',
            status: 'info',
            duration: 2000,
          });
        }, 30000);
      },
      cooldown: 300,
      isActive: false,
    },
    {
      id: 'time-freeze',
      name: 'Gel du Temps',
      description: 'Gèle le temps pendant 10 secondes',
      icon: FaClock,
      effect: () => {
        setIsTimeFrozen(true);
        toast({
          title: 'Temps Gelé !',
          description: 'Vous avez 10 secondes pour réfléchir',
          status: 'success',
          duration: 2000,
        });
        setTimeout(() => {
          setIsTimeFrozen(false);
          toast({
            title: 'Temps Repris',
            description: 'Le temps reprend son cours normal',
            status: 'info',
            duration: 2000,
          });
        }, 10000);
      },
      cooldown: 600,
      isActive: false,
    },
    {
      id: 'shield',
      name: 'Bouclier',
      description: 'Protège contre une mauvaise réponse',
      icon: FaShieldAlt,
      effect: () => {
        setHasShield(true);
        toast({
          title: 'Bouclier Activé !',
          description: 'Vous êtes protégé contre une mauvaise réponse',
          status: 'success',
          duration: 2000,
        });
      },
      cooldown: 900,
      isActive: false,
    },
  ]);

  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([
    {
      id: 'solve-10',
      description: 'Résoudre 10 problèmes',
      reward: 50,
      completed: false,
    },
    {
      id: 'perfect-score',
      description: 'Obtenir un score parfait sur 5 problèmes consécutifs',
      reward: 100,
      completed: false,
    },
    {
      id: 'use-powerup',
      description: 'Utiliser un power-up',
      reward: 30,
      completed: false,
    },
  ]);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { name: 'MathHero', score: 1000, level: 5, date: '2024-03-20' },
    { name: 'CalculMaster', score: 850, level: 4, date: '2024-03-20' },
    { name: 'NumberWizard', score: 750, level: 4, date: '2024-03-20' },
  ]);

  const { isOpen: isLeaderboardOpen, onOpen: onLeaderboardOpen, onClose: onLeaderboardClose } = useDisclosure();
  const { isOpen: isChallengesOpen, onOpen: onChallengesOpen, onClose: onChallengesClose } = useDisclosure();

  const generateProblem = (): MathProblem => {
    const types = ['addition', 'soustraction', 'multiplication', 'division'];
    const type = types[Math.floor(Math.random() * types.length)] as MathProblem['type'];
    let num1, num2, answer;

    switch (type) {
      case 'addition':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        break;
      case 'soustraction':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
        break;
      case 'multiplication':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      case 'division':
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * answer;
        break;
    }

    const options = [answer];
    while (options.length < 4) {
      const option = Math.floor(Math.random() * 100) + 1;
      if (!options.includes(option)) {
        options.push(option);
      }
    }

    return {
      question: `${num1} ${type === 'addition' ? '+' : type === 'soustraction' ? '-' : type === 'multiplication' ? '×' : '÷'} ${num2} = ?`,
      answer,
      options: options.sort(() => Math.random() - 0.5),
      type,
      difficulty: character.level,
    };
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (!currentProblem) return;

    const isCorrect = selectedAnswer === currentProblem.answer;
    
    // Mise à jour des statistiques
    setProblemsSolved(prev => prev + 1);
    
    if (isCorrect) {
      setConsecutiveCorrect(prev => prev + 1);
      const xpGain = isDoubleXPActive ? 40 : 20;
      
      setScore(score + 10);
      setCharacter(prev => ({
        ...prev,
        xp: prev.xp + xpGain,
      }));
      
      setAnimations(prev => [...prev, 'success']);
      
      toast({
        title: 'Correct !',
        description: 'Tu as trouvé la bonne réponse !',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      if (hasShield) {
        setHasShield(false);
        toast({
          title: 'Bouclier Utilisé !',
          description: 'Votre bouclier vous a protégé',
          status: 'info',
          duration: 2000,
        });
      } else {
        setConsecutiveCorrect(0);
        setCharacter(prev => ({
          ...prev,
          health: Math.max(0, prev.health - 10),
        }));
        
        setAnimations(prev => [...prev, 'fail']);
        
        toast({
          title: 'Incorrect !',
          description: `La bonne réponse était ${currentProblem.answer}`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }

    // Mise à jour des défis quotidiens
    setDailyChallenges(prev => prev.map(challenge => {
      if (challenge.id === 'solve-10' && problemsSolved + 1 >= 10) {
        return { ...challenge, completed: true };
      }
      if (challenge.id === 'perfect-score' && consecutiveCorrect >= 5) {
        return { ...challenge, completed: true };
      }
      return challenge;
    }));

    // Vérifier si le niveau augmente
    if (character.xp >= character.level * 100) {
      setGameState('levelUp');
      setCharacter(prev => ({
        ...prev,
        level: prev.level + 1,
        health: 100,
        xp: 0,
      }));
    }

    setCurrentProblem(generateProblem());
  };

  // Mise à jour du classement
  useEffect(() => {
    if (score > 0) {
      setLeaderboard(prev => {
        const newEntry = {
          name: character.name,
          score,
          level: character.level,
          date: new Date().toISOString().split('T')[0],
        };
        
        const updatedLeaderboard = [...prev, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        
        return updatedLeaderboard;
      });
    }
  }, [score, character.level]);

  useEffect(() => {
    setCurrentProblem(generateProblem());
  }, []);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, purple.900, blue.900)"
      color="white"
      p={8}
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={8} align="stretch">
        {/* En-tête du jeu */}
        <HStack justify="space-between">
          <VStack align="start">
            <Text fontSize="2xl" fontWeight="bold">
              {character.name}
            </Text>
            <HStack>
              <Icon as={FaHeart} color="red.500" />
              <Progress
                value={character.health}
                colorScheme="red"
                size="sm"
                w="200px"
                borderRadius="full"
              />
            </HStack>
          </VStack>
          
          <VStack align="end">
            <HStack>
              <Icon as={FaStar} color="yellow.400" />
              <Text>Niveau {character.level}</Text>
            </HStack>
            <Progress
              value={(character.xp / (character.level * 100)) * 100}
              colorScheme="yellow"
              size="sm"
              w="200px"
              borderRadius="full"
            />
          </VStack>
        </HStack>

        {/* Nouveau header avec boutons d'action */}
        <HStack justify="space-between" mb={4}>
          <Button
            leftIcon={<FaCrown />}
            colorScheme="yellow"
            onClick={onLeaderboardOpen}
          >
            Classement
          </Button>
          <Button
            leftIcon={<FaTrophy />}
            colorScheme="green"
            onClick={onChallengesOpen}
          >
            Défis Quotidiens
          </Button>
        </HStack>

        {/* Zone de jeu principale */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          flex="1"
          position="relative"
        >
          <AnimatePresence>
            {animations.map((anim, index) => (
              <MotionBox
                key={index}
                position="absolute"
                variants={sparkleAnimation}
                initial="initial"
                animate="animate"
                onAnimationComplete={() => {
                  setAnimations(prev => prev.filter((_, i) => i !== index));
                }}
              >
                <Icon
                  as={anim === 'success' ? FaGem : FaMagic}
                  color={anim === 'success' ? 'yellow.400' : 'red.400'}
                  boxSize={8}
                />
              </MotionBox>
            ))}
          </AnimatePresence>

          {currentProblem && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              variants={floatAnimation}
              bg="rgba(0,0,0,0.3)"
              p={8}
              borderRadius="xl"
              boxShadow="xl"
            >
              <VStack spacing={6}>
                <Text fontSize="4xl" fontWeight="bold" textAlign="center">
                  {currentProblem.question}
                </Text>

                <SimpleGrid columns={2} spacing={4}>
                  {currentProblem.options.map((option, index) => (
                    <MotionBox
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        colorScheme="blue"
                        w="full"
                        h="20"
                        onClick={() => handleAnswer(option)}
                        _hover={{
                          bg: 'blue.400',
                          transform: 'translateY(-2px)',
                        }}
                      >
                        <Text fontSize="2xl">{option}</Text>
                      </Button>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </VStack>
            </MotionBox>
          )}

          {gameState === 'levelUp' && (
            <MotionBox
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              variants={floatAnimation}
              bg="rgba(0,0,0,0.5)"
              p={8}
              borderRadius="xl"
            >
              <VStack spacing={4}>
                <Icon as={FaTrophy} boxSize={16} color="yellow.400" />
                <Text fontSize="3xl" fontWeight="bold">
                  Niveau Supérieur !
                </Text>
                <Button
                  colorScheme="green"
                  onClick={() => setGameState('playing')}
                >
                  Continuer l'aventure
                </Button>
              </VStack>
            </MotionBox>
          )}
        </Flex>

        {/* Score et statistiques */}
        <HStack justify="center" spacing={8}>
          <Badge colorScheme="purple" fontSize="lg" px={4} py={2}>
            Score: {score}
          </Badge>
          <Badge colorScheme="blue" fontSize="lg" px={4} py={2}>
            XP: {character.xp}/{character.level * 100}
          </Badge>
        </HStack>

        {/* Power-ups */}
        <HStack spacing={4} justify="center" mt={4}>
          {powerUps.map((powerUp) => (
            <Button
              key={powerUp.id}
              leftIcon={<Icon as={powerUp.icon} />}
              colorScheme="purple"
              variant={powerUp.isActive ? 'solid' : 'outline'}
              onClick={() => {
                if (!powerUp.isActive) {
                  powerUp.effect();
                  setPowerUps(prev => prev.map(p => 
                    p.id === powerUp.id ? { ...p, isActive: true } : p
                  ));
                  setTimeout(() => {
                    setPowerUps(prev => prev.map(p => 
                      p.id === powerUp.id ? { ...p, isActive: false } : p
                    ));
                  }, powerUp.cooldown * 1000);
                }
              }}
            >
              {powerUp.name}
            </Button>
          ))}
        </HStack>
      </VStack>

      {/* Modal du classement */}
      <Modal isOpen={isLeaderboardOpen} onClose={onLeaderboardClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Classement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="white">Position</Th>
                  <Th color="white">Joueur</Th>
                  <Th color="white">Score</Th>
                  <Th color="white">Niveau</Th>
                </Tr>
              </Thead>
              <Tbody>
                {leaderboard.map((entry, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{entry.name}</Td>
                    <Td>{entry.score}</Td>
                    <Td>{entry.level}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal des défis quotidiens */}
      <Modal isOpen={isChallengesOpen} onClose={onChallengesClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Défis Quotidiens</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {dailyChallenges.map((challenge) => (
                <HStack
                  key={challenge.id}
                  w="full"
                  justify="space-between"
                  p={4}
                  bg={challenge.completed ? 'green.900' : 'gray.700'}
                  borderRadius="md"
                >
                  <VStack align="start">
                    <Text fontWeight="bold">{challenge.description}</Text>
                    <Text color="yellow.400">Récompense: {challenge.reward} XP</Text>
                  </VStack>
                  <Badge colorScheme={challenge.completed ? 'green' : 'yellow'}>
                    {challenge.completed ? 'Terminé' : 'En cours'}
                  </Badge>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MathAdventure; 