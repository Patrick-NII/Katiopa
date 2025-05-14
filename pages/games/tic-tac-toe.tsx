import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Select,
  useColorModeValue,
  Image,
  HStack,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Tooltip,
  Progress,
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import {
  FaTimes,
  FaCircle,
  FaTrophy,
  FaChartLine,
  FaLightbulb,
  FaHistory,
  FaMedal,
  FaCrown,
  FaStar,
  FaLock
} from 'react-icons/fa';

type Player = 'X' | 'O' | null;
type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
type GameMode = 'vsComputer' | 'vsPlayer' | 'vsKati' | 'tournament' | 'training';
type BadgeType = 'firstWin' | 'streak5' | 'streak10' | 'perfectGame' | 'tournamentWinner';

interface GameStats {
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  bestStreak: number;
  currentStreak: number;
  lastPlayed: Date;
  perfectGames: number;
  tournamentsWon: number;
}

interface TopPlayer {
  name: string;
  wins: number;
  streak: number;
  lastPlayed: Date;
  badges: BadgeType[];
}

interface GameHistory {
  date: Date;
  mode: GameMode;
  difficulty?: Difficulty;
  result: 'win' | 'loss' | 'draw';
  moves: number[];
  duration: number;
}

interface Tournament {
  id: string;
  rounds: number;
  currentRound: number;
  players: {
    name: string;
    wins: number;
  }[];
  status: 'active' | 'completed';
}

// Liste de noms de plantes africaines
const africanPlantNames = [
  'Baobab', 'Acacia', 'Moringa', 'Kigelia', 'Sausage', 'Marula', 'Shea', 'Dragon', 'Aloe', 'Welwitschia',
  'Cape', 'Protea', 'King', 'Sugarbush', 'Pincushion', 'Leopard', 'Corkwood', 'Quiver', 'Candelabra', 'Euphorbia',
  'Desert', 'Rose', 'Socotra', 'Dragon', 'Blood', 'Lily', 'Impatiens', 'Garcinia', 'Kola', 'Yohimbe'
];

const getRandomMove = (board: Player[]): number => {
  const availableMoves = board
    .map((square, index) => (square === null ? index : null))
    .filter((index): index is number => index !== null);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const checkWinner = (squares: Player[]): Player => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const getMediumMove = (board: Player[]): number => {
  // Check for winning move
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = 'O';
      if (checkWinner(newBoard)) return i;
    }
  }

  // Check for blocking move
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = 'X';
      if (checkWinner(newBoard)) return i;
    }
  }

  return getRandomMove(board);
};

const getBestMove = (board: Player[]): number => {
  // Check for winning move
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = 'O';
      if (checkWinner(newBoard)) return i;
    }
  }

  // Check for blocking move
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = 'X';
      if (checkWinner(newBoard)) return i;
    }
  }

  // Take center if available
  if (board[4] === null) return 4;

  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available move
  return getRandomMove(board);
};

const TicTacToe = () => {
  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'blue.900');
  const cellBgColor = useColorModeValue('gray.100', 'blue.800');
  const borderColor = useColorModeValue('gray.200', 'blue.700');
  const cardBgColor = useColorModeValue('blue.50', 'blue.900');
  const premiumBgColor = useColorModeValue('yellow.50', 'yellow.900');
  const badgeBgColor = useColorModeValue('gray.50', 'gray.800');
  const badgeBorderColor = useColorModeValue('gray.200', 'gray.700');

  // State
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameMode, setGameMode] = useState<GameMode>('vsComputer');
  const [score, setScore] = useState({ player1: 0, player2: 0, draws: 0 });
  const [playerName] = useState<string>(africanPlantNames[Math.floor(Math.random() * africanPlantNames.length)]);
  const [isPremium] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    totalGames: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    bestStreak: 0,
    currentStreak: 0,
    lastPlayed: new Date(),
    perfectGames: 0,
    tournamentsWon: 0,
  });
  const [topPlayers] = useState<TopPlayer[]>([
    { name: 'Jean', wins: 15, streak: 5, lastPlayed: new Date(), badges: ['firstWin', 'streak5'] },
    { name: 'Marie', wins: 12, streak: 4, lastPlayed: new Date(), badges: ['firstWin'] },
    { name: 'Pierre', wins: 10, streak: 3, lastPlayed: new Date(), badges: ['firstWin', 'perfectGame'] },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [currentTournament, setCurrentTournament] = useState<Tournament | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const toast = useToast();

  const isBoardFull = (squares: Player[]) => {
    return squares.every(square => square !== null);
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    
    const newWinner = checkWinner(newBoard);
    const isFullBoard = isBoardFull(newBoard);
    
    if (newWinner || isFullBoard) {
      const result = newWinner === 'X' ? 'win' : newWinner === 'O' ? 'loss' : 'draw';
      
      // Batch all state updates
      setBoard(newBoard);
      setWinner(newWinner);
      setGameOver(isFullBoard);
      updateStats(result);
      updateGameHistory(result);
      
      if (newWinner) {
        checkBadges();
        toast({
          title: newWinner === 'X' ? 'Victoire !' : 'Défaite !',
          description: newWinner === 'X' ? 'Vous avez gagné !' : 'L\'adversaire a gagné.',
          status: newWinner === 'X' ? 'success' : 'error',
          duration: 3000,
          isClosable: true,
        });
      } else if (isFullBoard) {
        toast({
          title: 'Match nul !',
          description: 'La partie est terminée.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }

    // If game continues
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    generateSuggestions(newBoard);
  };

  const updateStats = (result: 'win' | 'loss' | 'draw') => {
    setStats(prev => {
      const newStats = {
        ...prev,
        totalGames: prev.totalGames + 1,
        lastPlayed: new Date(),
      };

      if (result === 'win') {
        newStats.wins++;
        newStats.currentStreak++;
        if (newStats.currentStreak > newStats.bestStreak) {
          newStats.bestStreak = newStats.currentStreak;
        }
      } else if (result === 'loss') {
        newStats.losses++;
        newStats.currentStreak = 0;
      } else {
        newStats.draws++;
      }

      return newStats;
    });
  };

  const updateGameHistory = (result: 'win' | 'loss' | 'draw') => {
    if (!startTime) return;

    const endTime = new Date();
    const duration = (endTime.getTime() - startTime.getTime()) / 1000; // en secondes

    const historyEntry: GameHistory = {
      date: new Date(),
      mode: gameMode,
      difficulty: gameMode !== 'vsPlayer' ? difficulty : undefined,
      result,
      moves: board.map((cell, index) => cell ? index : -1).filter(index => index !== -1),
      duration,
    };

    setGameHistory(prev => [historyEntry, ...prev].slice(0, 10)); // Garder les 10 dernières parties
  };

  const checkBadges = () => {
    setStats(prev => {
      const newStats = { ...prev };
      const newBadges: BadgeType[] = [];

      if (prev.wins === 1) newBadges.push('firstWin');
      if (prev.currentStreak === 5) newBadges.push('streak5');
      if (prev.currentStreak === 10) newBadges.push('streak10');
      if (prev.perfectGames > 0) newBadges.push('perfectGame');
      if (prev.tournamentsWon > 0) newBadges.push('tournamentWinner');

      return newStats;
    });
  };

  const startTournament = () => {
    const tournament: Tournament = {
      id: Date.now().toString(),
      rounds: 3,
      currentRound: 1,
      players: [
        { name: 'Joueur 1', wins: 0 },
        { name: gameMode === 'vsKati' ? 'Kati' : 'Ordinateur', wins: 0 },
      ],
      status: 'active',
    };
    setCurrentTournament(tournament);
    resetGame();
  };

  const generateSuggestions = (currentBoard: Player[]) => {
    const newSuggestions: string[] = [];
    
    // Vérifier les opportunités de victoire
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = currentPlayer;
        if (checkWinner(testBoard)) {
          newSuggestions.push(`Placez votre pion en position ${i + 1} pour gagner !`);
        }
      }
    }

    // Vérifier les menaces de l'adversaire
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = currentPlayer === 'X' ? 'O' : 'X';
        if (checkWinner(testBoard)) {
          newSuggestions.push(`Bloquez votre adversaire en position ${i + 1} !`);
        }
      }
    }

    // Stratégies générales
    if (currentBoard[4] === null) {
      newSuggestions.push('Prenez le centre pour un avantage stratégique !');
    }

    // Suggestions avancées
    if (difficulty === 'hard' || difficulty === 'expert') {
      if (currentBoard[0] === currentPlayer && currentBoard[8] === null) {
        newSuggestions.push('Essayez de compléter la diagonale principale !');
      }
      if (currentBoard[2] === currentPlayer && currentBoard[6] === null) {
        newSuggestions.push('Essayez de compléter la diagonale secondaire !');
      }
    }

    setSuggestions(newSuggestions);
  };

  const computerMove = useCallback(() => {
    if (currentPlayer !== 'O' || winner || gameOver) return;

    const newBoard = [...board];
    let move: number;

    switch (difficulty) {
      case 'easy':
        move = getRandomMove(newBoard);
        break;
      case 'medium':
        move = getMediumMove(newBoard);
        break;
      case 'hard':
        move = getBestMove(newBoard);
        break;
      default:
        move = getRandomMove(newBoard);
    }

    newBoard[move] = 'O';
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setScore(prev => ({ ...prev, player2: prev.player2 + 1 }));
      toast({
        title: 'Défaite !',
        description: 'L\'ordinateur a gagné.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true);
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
      toast({
        title: 'Match nul !',
        description: 'La partie est terminée.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setCurrentPlayer('X');
  }, [board, currentPlayer, difficulty, gameOver, winner, toast]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (currentPlayer === 'O' && !winner && !gameOver) {
      timeoutId = setTimeout(() => {
        computerMove();
      }, 500);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentPlayer, winner, gameOver, computerMove]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
    setSuggestions([]);
    setStartTime(new Date());
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Image src="/images/tictactoe.webp" alt="Tic Tac Toe" maxW="200px" />
        <Heading>Tic Tac Toe</Heading>

        <Tabs variant="soft-rounded" colorScheme="blue" width="100%">
          <TabList>
            <Tab>Jouer</Tab>
            <Tab>Statistiques</Tab>
            <Tab>Classement</Tab>
            {isPremium && <Tab>Historique</Tab>}
            {isPremium && <Tab>Badges</Tab>}
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={6}>
                <HStack spacing={4}>
                  <Text>Mode de jeu :</Text>
                  <Select
                    value={gameMode}
                    onChange={(e) => {
                      setGameMode(e.target.value as GameMode);
                      resetGame();
                    }}
                    width="200px"
                  >
                    <option value="vsComputer">VS Ordinateur</option>
                    <option value="vsPlayer">VS Joueur</option>
                    {isPremium && <option value="vsKati">VS Kati</option>}
                    {isPremium && <option value="tournament">Tournoi</option>}
                    {isPremium && <option value="training">Entraînement</option>}
                  </Select>
                </HStack>

                {gameMode !== 'vsPlayer' && gameMode !== 'tournament' && (
                  <HStack spacing={4}>
                    <Text>Difficulté :</Text>
                    <Select
                      value={difficulty}
                      onChange={(e) => {
                        setDifficulty(e.target.value as Difficulty);
                        resetGame();
                      }}
                      width="200px"
                    >
                      <option value="easy">Facile</option>
                      <option value="medium">Moyen</option>
                      {isPremium && <option value="hard">Difficile</option>}
                      {isPremium && <option value="expert">Expert</option>}
                    </Select>
                  </HStack>
                )}

                {gameMode === 'tournament' && currentTournament && isPremium && (
                  <Box width="100%" p={4} bg={cardBgColor} borderRadius="md">
                    <VStack spacing={2}>
                      <Text fontWeight="bold">Tournoi en cours</Text>
                      <Text>Round {currentTournament.currentRound} sur {currentTournament.rounds}</Text>
                      <Progress value={(currentTournament.currentRound / currentTournament.rounds) * 100} width="100%" />
                    </VStack>
                  </Box>
                )}

                <HStack spacing={8}>
                  <Box textAlign="center">
                    <Text fontSize="lg" fontWeight="bold">{playerName} (X)</Text>
                    <Text fontSize="2xl">{score.player1}</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontSize="lg" fontWeight="bold">Matchs nuls</Text>
                    <Text fontSize="2xl">{score.draws}</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontSize="lg" fontWeight="bold">
                      {gameMode === 'vsPlayer' ? 'Joueur 2' : gameMode === 'vsKati' ? 'Kati' : 'Ordinateur'} (O)
                    </Text>
                    <Text fontSize="2xl">{score.player2}</Text>
                  </Box>
                </HStack>

                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={2}
                  bg={bgColor}
                  p={4}
                  borderRadius="lg"
                >
                  {board.map((cell, index) => (
                    <Box
                      key={index}
                      w="100px"
                      h="100px"
                      bg={cellBgColor}
                      border="2px"
                      borderColor={borderColor}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor={cell === null && !winner && !gameOver ? 'pointer' : 'default'}
                      onClick={() => handleClick(index)}
                      _hover={{
                        bg: cell === null && !winner && !gameOver ? 'gray.200' : cellBgColor,
                      }}
                    >
                      {cell === 'X' && <FaTimes size={40} color="#3182CE" />}
                      {cell === 'O' && <FaCircle size={40} color="#E53E3E" />}
                    </Box>
                  ))}
                </Box>

                {suggestions.length > 0 && isPremium && (
                  <Box
                    p={4}
                    bg={cardBgColor}
                    borderRadius="md"
                    width="100%"
                  >
                    <HStack spacing={2}>
                      <FaLightbulb color="#3182CE" />
                      <Text fontWeight="bold">Suggestions :</Text>
                    </HStack>
                    <VStack align="start" mt={2}>
                      {suggestions.map((suggestion, index) => (
                        <Text key={index}>{suggestion}</Text>
                      ))}
                    </VStack>
                  </Box>
                )}

                {!isPremium && (
                  <Box
                    p={4}
                    bg={premiumBgColor}
                    borderRadius="md"
                    width="100%"
                  >
                    <HStack spacing={2}>
                      <FaLock color="#D69E2E" />
                      <Text fontWeight="bold">Fonctionnalités Premium</Text>
                    </HStack>
                    <Text mt={2}>
                      Débloquez toutes les fonctionnalités avancées en passant à la version premium !
                    </Text>
                    <Button
                      colorScheme="yellow"
                      mt={4}
                      onClick={() => {
                        toast({
                          title: "Version Premium",
                          description: "Cette fonctionnalité sera bientôt disponible !",
                          status: "info",
                          duration: 3000,
                          isClosable: true,
                        });
                      }}
                    >
                      Passer à la version Premium
                    </Button>
                  </Box>
                )}

                <Button
                  colorScheme="blue"
                  onClick={resetGame}
                  size="lg"
                >
                  Nouvelle partie
                </Button>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={4} align="start">
                <HStack>
                  <FaChartLine size={24} />
                  <Heading size="md">Statistiques de jeu</Heading>
                </HStack>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Parties jouées</Td>
                      <Td isNumeric>{stats.totalGames}</Td>
                    </Tr>
                    <Tr>
                      <Td>Victoires</Td>
                      <Td isNumeric>{stats.wins}</Td>
                    </Tr>
                    <Tr>
                      <Td>Défaites</Td>
                      <Td isNumeric>{stats.losses}</Td>
                    </Tr>
                    <Tr>
                      <Td>Matchs nuls</Td>
                      <Td isNumeric>{stats.draws}</Td>
                    </Tr>
                    <Tr>
                      <Td>Meilleure série</Td>
                      <Td isNumeric>{stats.bestStreak}</Td>
                    </Tr>
                    <Tr>
                      <Td>Série actuelle</Td>
                      <Td isNumeric>{stats.currentStreak}</Td>
                    </Tr>
                    <Tr>
                      <Td>Parties parfaites</Td>
                      <Td isNumeric>{stats.perfectGames}</Td>
                    </Tr>
                    <Tr>
                      <Td>Tournois gagnés</Td>
                      <Td isNumeric>{stats.tournamentsWon}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={4} align="start">
                <HStack>
                  <FaTrophy size={24} />
                  <Heading size="md">Classement des meilleurs joueurs</Heading>
                </HStack>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Joueur</Th>
                      <Th isNumeric>Victoires</Th>
                      <Th isNumeric>Meilleure série</Th>
                      {isPremium && <Th>Badges</Th>}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {topPlayers.map((player, index) => (
                      <Tr key={index}>
                        <Td>
                          <HStack>
                            <Text>{player.name}</Text>
                            {index === 0 && <Badge colorScheme="yellow">1er</Badge>}
                            {index === 1 && <Badge colorScheme="gray">2ème</Badge>}
                            {index === 2 && <Badge colorScheme="orange">3ème</Badge>}
                          </HStack>
                        </Td>
                        <Td isNumeric>{player.wins}</Td>
                        <Td isNumeric>{player.streak}</Td>
                        {isPremium && (
                          <Td>
                            <HStack>
                              {player.badges.map((badge, i) => (
                                <Tooltip key={i} label={getBadgeLabel(badge)}>
                                  <Box>
                                    {getBadgeIcon(badge)}
                                  </Box>
                                </Tooltip>
                              ))}
                            </HStack>
                          </Td>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </VStack>
            </TabPanel>

            {isPremium && (
              <TabPanel>
                <VStack spacing={4} align="start">
                  <HStack>
                    <FaHistory size={24} />
                    <Heading size="md">Historique des parties</Heading>
                  </HStack>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Date</Th>
                        <Th>Mode</Th>
                        <Th>Résultat</Th>
                        <Th>Durée</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {gameHistory.map((game, index) => (
                        <Tr key={index}>
                          <Td>{new Date(game.date).toLocaleString()}</Td>
                          <Td>
                            {game.mode === 'vsComputer' && 'VS Ordinateur'}
                            {game.mode === 'vsPlayer' && 'VS Joueur'}
                            {game.mode === 'vsKati' && 'VS Kati'}
                            {game.mode === 'tournament' && 'Tournoi'}
                            {game.mode === 'training' && 'Entraînement'}
                            {game.difficulty && ` (${game.difficulty})`}
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={
                                game.result === 'win' ? 'green' :
                                game.result === 'loss' ? 'red' : 'yellow'
                              }
                            >
                              {game.result === 'win' ? 'Victoire' :
                               game.result === 'loss' ? 'Défaite' : 'Match nul'}
                            </Badge>
                          </Td>
                          <Td>{Math.round(game.duration)}s</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </VStack>
              </TabPanel>
            )}

            {isPremium && (
              <TabPanel>
                <VStack spacing={4} align="start">
                  <HStack>
                    <FaMedal size={24} />
                    <Heading size="md">Badges</Heading>
                  </HStack>
                  <SimpleGrid columns={2} spacing={4} width="100%">
                    {[
                      { type: 'firstWin', label: 'Première victoire', icon: <FaStar /> },
                      { type: 'streak5', label: 'Série de 5 victoires', icon: <FaTrophy /> },
                      { type: 'streak10', label: 'Série de 10 victoires', icon: <FaCrown /> },
                      { type: 'perfectGame', label: 'Partie parfaite', icon: <FaMedal /> },
                      { type: 'tournamentWinner', label: 'Vainqueur de tournoi', icon: <FaTrophy /> },
                    ].map((badge) => (
                      <Box
                        key={badge.type}
                        p={4}
                        bg={badgeBgColor}
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor={badgeBorderColor}
                      >
                        <HStack>
                          {badge.icon}
                          <Text>{badge.label}</Text>
                        </HStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                </VStack>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

const getBadgeLabel = (badge: BadgeType): string => {
  switch (badge) {
    case 'firstWin': return 'Première victoire';
    case 'streak5': return 'Série de 5 victoires';
    case 'streak10': return 'Série de 10 victoires';
    case 'perfectGame': return 'Partie parfaite';
    case 'tournamentWinner': return 'Vainqueur de tournoi';
    default: return '';
  }
};

const getBadgeIcon = (badge: BadgeType) => {
  switch (badge) {
    case 'firstWin': return <FaStar color="#FFD700" />;
    case 'streak5': return <FaTrophy color="#C0C0C0" />;
    case 'streak10': return <FaCrown color="#FFD700" />;
    case 'perfectGame': return <FaMedal color="#CD7F32" />;
    case 'tournamentWinner': return <FaTrophy color="#FFD700" />;
    default: return null;
  }
};

export default TicTacToe; 