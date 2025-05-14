import {
  Box,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Tag,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Card,
  CardBody,
  Icon,
  Button,
  Select,
  Image,
  Flex,
  IconButton,
  useToast,
  Badge,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaSearch, FaCalculator, FaFlask, FaRobot, FaCode, FaChartLine, FaLock, FaTrophy, FaStar, FaArrowRight, FaArrowLeft, FaVolumeUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragExercise, MemoryExercise, PuzzleExercise } from '@/components/exercises/ExerciseComponents';
import { LudoGame } from '@/components/exercises/LudoGame';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Animation pour les étoiles
const twinkle = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

interface Exercise {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  type: 'qcm' | 'number' | 'text' | 'drag' | 'memory' | 'puzzle' | 'wordsearch' | 'ladderrace' | 'ludo';
  hint?: string;
  imageUrl?: string;
  audioUrl?: string;
  items?: string[];
  pairs?: Array<{ question: string; answer: string }>;
  targetNumber?: number;
  difficulty?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  ageRange: string;
  level: string;
  duration: string;
  exercises: Exercise[];
  isPro?: boolean;
}

const subjects = [
  { name: 'Mathématiques', icon: FaCalculator, color: 'blue' },
  { name: 'Sciences', icon: FaFlask, color: 'green' },
  { name: 'Intelligence Artificielle', icon: FaRobot, color: 'purple' },
  { name: 'Programmation', icon: FaCode, color: 'orange' },
  { name: 'Algorithmie', icon: FaChartLine, color: 'red' },
];

const ageRanges = ['5-7 ans', '8-10 ans', '11-13 ans', '14-15 ans'];

const mockCourses: Course[] = [
  // Mathématiques 5-7 ans
  {
    id: 'math-1-1',
    title: 'Les nombres magiques',
    description: 'Un voyage amusant dans le monde des nombres',
    subject: 'Mathématiques',
    ageRange: '5-7 ans',
    level: 'Débutant',
    duration: '30 min',
    exercises: [
      {
        id: 'math-1-1-ex1',
        type: 'drag',
        question: 'Place les nombres dans l\'ordre croissant sur le train magique',
        items: ['1', '2', '3', '4', '5'],
        correctAnswer: '12345',
        explanation: 'Comme un train qui avance, les nombres grandissent de gauche à droite. Le 1 est la locomotive !',
        imageUrl: '/katiopa/images/exercises/numbers-train.png',
        hint: 'Pense à compter sur tes doigts pour vérifier quel nombre vient après',
      },
      {
        id: 'math-1-1-ex2',
        type: 'memory',
        question: 'Trouve les paires qui font la même somme',
        pairs: [
          { question: '2+3', answer: '1+4' },
          { question: '3+2', answer: '4+1' },
          { question: '2+2', answer: '1+3' },
          { question: '5+0', answer: '3+2' },
        ],
        correctAnswer: '',
        explanation: 'Il y a plusieurs façons différentes d\'obtenir le même nombre. Par exemple, 2+3 et 1+4 font tous les deux 5 !',
        hint: 'Utilise tes doigts pour calculer chaque somme',
      },
      {
        id: 'math-1-1-ex3',
        type: 'puzzle',
        question: 'Reconstitue l\'image du nombre huit',
        imageUrl: '/katiopa/images/exercises/number-8-puzzle.png',
        correctAnswer: '8',
        explanation: 'Le nombre 8 ressemble à un bonhomme de neige ! En le dessinant, on fait deux boucles l\'une au-dessus de l\'autre',
        hint: 'Regarde la forme générale : elle ressemble à deux cercles empilés',
      },
      {
        id: 'math-1-1-ex4',
        type: 'qcm',
        question: 'Dans la classe, il y a 3 filles et 2 garçons. Combien y a-t-il d\'enfants en tout ?',
        options: ['4', '5', '6'],
        correctAnswer: '5',
        explanation: 'Pour trouver le total, on additionne les filles et les garçons : 3 filles + 2 garçons = 5 enfants',
        hint: 'Dessine 3 ronds pour les filles, puis ajoute 2 ronds pour les garçons',
      },
      {
        id: 'math-1-1-ex5',
        type: 'drag',
        question: 'Range les nombres du plus grand au plus petit',
        items: ['5', '4', '3', '2', '1'],
        correctAnswer: '54321',
        explanation: 'Cette fois-ci, on range les nombres comme une échelle qui descend !',
        hint: 'Commence par trouver le plus grand nombre',
      },
    ],
  },
  {
    id: 'math-1-2',
    title: 'Le monde des formes',
    description: 'Découvre les formes géométriques qui nous entourent',
    subject: 'Mathématiques',
    ageRange: '5-7 ans',
    level: 'Débutant',
    duration: '35 min',
    exercises: [
      {
        id: 'math-1-2-ex1',
        type: 'memory',
        question: 'Associe chaque forme à un objet du quotidien',
        pairs: [
          { question: 'Cercle', answer: 'Ballon' },
          { question: 'Rectangle', answer: 'Porte' },
          { question: 'Triangle', answer: 'Toit' },
          { question: 'Carré', answer: 'Fenêtre' },
        ],
        correctAnswer: '',
        explanation: 'Les formes géométriques sont partout autour de nous !',
        imageUrl: '/katiopa/images/exercises/geometric-shapes.png',
      },
      {
        id: 'math-1-2-ex2',
        type: 'drag',
        question: 'Construis une maison avec les formes',
        items: ['Carré (mur)', 'Triangle (toit)', 'Rectangle (porte)', 'Cercle (fenêtre)'],
        correctAnswer: '',
        explanation: 'Une maison est composée de différentes formes : un carré pour les murs, un triangle pour le toit...',
        imageUrl: '/katiopa/images/exercises/house-shapes.png',
      },
      {
        id: 'math-1-2-ex3',
        type: 'qcm',
        question: 'Combien de côtés a un triangle ?',
        options: ['2', '3', '4'],
        correctAnswer: '3',
        explanation: 'Le triangle a 3 côtés, c\'est ce qui lui donne sa forme particulière !',
        hint: 'Trace un triangle avec ton doigt dans l\'air et compte les traits',
      },
      {
        id: 'math-1-2-ex4',
        type: 'puzzle',
        question: 'Reconstitue le tangram',
        imageUrl: '/katiopa/images/exercises/tangram.png',
        correctAnswer: '',
        explanation: 'Le tangram est un puzzle chinois fait de formes géométriques. On peut créer plein d\'images différentes !',
        hint: 'Commence par placer le grand triangle',
      },
    ],
  },
  {
    id: 'math-1-3',
    title: 'Jeux de calcul',
    description: 'Amuse-toi avec les additions et soustractions',
    subject: 'Mathématiques',
    ageRange: '5-7 ans',
    level: 'Débutant',
    duration: '30 min',
    exercises: [
      {
        id: 'math-1-3-ex1',
        type: 'wordsearch',
        question: 'Trouve toutes les additions qui donnent 8',
        targetNumber: 8,
        correctAnswer: '',
        explanation: 'Bravo ! Tu as trouvé toutes les combinaisons possibles',
        hint: 'Commence par 0 + 8, puis 1 + 7, etc.',
      },
      {
        id: 'math-1-3-ex2',
        type: 'ladderrace',
        question: 'Course à l\'échelle contre Okapi',
        difficulty: 'easy',
        correctAnswer: '',
        explanation: 'Le premier à atteindre 150 cases gagne !',
        hint: 'Réponds vite et correctement pour avancer plus vite qu\'Okapi',
      },
      {
        id: 'math-1-3-ex3',
        type: 'wordsearch',
        question: 'Trouve toutes les additions qui donnent 10',
        targetNumber: 10,
        correctAnswer: '',
        explanation: 'Excellent ! Tu maîtrises les additions',
        hint: 'N\'oublie pas les combinaisons comme 5 + 5',
      },
      {
        id: 'math-1-3-ex4',
        type: 'ladderrace',
        question: 'Course à l\'échelle contre Okapi - Niveau moyen',
        difficulty: 'medium',
        correctAnswer: '',
        explanation: 'Okapi devient plus fort, mais tu peux le battre !',
        hint: 'Concentre-toi sur les calculs',
      },
    ],
  },
  {
    id: 'math-1-4',
    title: 'Ludo Mathématique',
    description: 'Joue au Ludo en résolvant des additions et soustractions',
    subject: 'Mathématiques',
    ageRange: '5-7 ans',
    level: 'Débutant',
    duration: '30 min',
    exercises: [
      {
        id: 'math-1-4-ex1',
        type: 'ludo',
        question: 'Joue contre Okapi en résolvant des additions et soustractions',
        difficulty: 'easy',
        correctAnswer: '',
        explanation: 'Bravo ! Tu as gagné la partie en résolvant les opérations plus vite qu\'Okapi',
        hint: 'Concentre-toi sur les calculs pour avancer plus vite',
      },
      {
        id: 'math-1-4-ex2',
        type: 'ludo',
        question: 'Course contre Okapi - Niveau moyen',
        difficulty: 'medium',
        correctAnswer: '',
        explanation: 'Les nombres sont plus grands, mais tu peux y arriver !',
        hint: 'Prends ton temps pour bien calculer',
      },
      {
        id: 'math-1-4-ex3',
        type: 'ludo',
        question: 'Défi final contre Okapi',
        difficulty: 'hard',
        correctAnswer: '',
        explanation: 'Félicitations ! Tu as maîtrisé les additions et soustractions',
        hint: 'Utilise des stratégies pour calculer plus vite',
      },
    ],
  },

  // Sciences 5-7 ans
  {
    id: 'science-1-1',
    title: 'Les animaux et leur environnement',
    description: 'Découvre comment vivent les animaux',
    subject: 'Sciences',
    ageRange: '5-7 ans',
    level: 'Débutant',
    duration: '40 min',
    exercises: [
      {
        id: 'science-1-1-ex1',
        type: 'memory',
        question: 'Associe chaque animal à son habitat',
        pairs: [
          { question: 'Poisson', answer: 'Océan' },
          { question: 'Oiseau', answer: 'Nid' },
          { question: 'Lapin', answer: 'Terrier' },
          { question: 'Abeille', answer: 'Ruche' },
        ],
        correctAnswer: '',
        explanation: 'Chaque animal a un habitat adapté à ses besoins !',
        imageUrl: '/katiopa/images/exercises/animal-habitats.png',
      },
      {
        id: 'science-1-1-ex2',
        type: 'drag',
        question: 'Place chaque animal dans son groupe',
        items: [
          'Dauphin → Mammifères marins',
          'Moineau → Oiseaux',
          'Grenouille → Amphibiens',
          'Lézard → Reptiles'
        ],
        correctAnswer: '',
        explanation: 'Les animaux sont classés en différents groupes selon leurs caractéristiques',
        imageUrl: '/katiopa/images/exercises/animal-groups.png',
      },
      {
        id: 'science-1-1-ex3',
        type: 'qcm',
        question: 'Que mangent les lapins ?',
        options: ['Carottes et herbe', 'Viande', 'Poisson'],
        correctAnswer: 'Carottes et herbe',
        explanation: 'Les lapins sont herbivores, ils mangent des végétaux comme les carottes, l\'herbe et les feuilles',
        imageUrl: '/katiopa/images/exercises/rabbit-food.png',
      },
      {
        id: 'science-1-1-ex4',
        type: 'puzzle',
        question: 'Reconstitue le cycle de vie du papillon',
        imageUrl: '/katiopa/images/exercises/butterfly-lifecycle.png',
        correctAnswer: '',
        explanation: 'Le papillon passe par plusieurs étapes : œuf, chenille, chrysalide, et enfin papillon !',
        hint: 'Commence par l\'œuf, qui est le début du cycle',
      },
    ],
  },

  // IA 11-13 ans
  {
    id: 'ia-1-1',
    title: 'Les bases de l\'Intelligence Artificielle',
    description: 'Comprendre comment les machines apprennent',
    subject: 'Intelligence Artificielle',
    ageRange: '11-13 ans',
    level: 'Intermédiaire',
    duration: '45 min',
    isPro: true,
    exercises: [
      {
        id: 'ia-1-1-ex1',
        type: 'drag',
        question: 'Place les étapes de l\'apprentissage automatique dans le bon ordre',
        items: [
          '1. Collecte des données',
          '2. Préparation des données',
          '3. Entraînement du modèle',
          '4. Test du modèle',
          '5. Amélioration du modèle'
        ],
        correctAnswer: '12345',
        explanation: 'L\'apprentissage automatique suit un processus précis, comme une recette de cuisine !',
        imageUrl: '/katiopa/images/exercises/ml-steps.png',
      },
      {
        id: 'ia-1-1-ex2',
        type: 'memory',
        question: 'Associe chaque type d\'IA à son application',
        pairs: [
          { question: 'Vision par ordinateur', answer: 'Reconnaissance faciale' },
          { question: 'Traitement du langage', answer: 'Assistant vocal' },
          { question: 'Apprentissage par renforcement', answer: 'Robot qui apprend à marcher' },
          { question: 'Réseaux de neurones', answer: 'Prédiction météo' },
        ],
        correctAnswer: '',
        explanation: 'L\'IA a différentes branches qui servent à résoudre différents types de problèmes',
      },
      {
        id: 'ia-1-1-ex3',
        type: 'puzzle',
        question: 'Reconstitue le schéma d\'un neurone artificiel',
        imageUrl: '/katiopa/images/exercises/artificial-neuron.png',
        correctAnswer: '',
        explanation: 'Un neurone artificiel est inspiré du fonctionnement du cerveau humain',
        hint: 'Les entrées sont à gauche, la sortie à droite',
      },
      {
        id: 'ia-1-1-ex4',
        type: 'qcm',
        question: 'Pourquoi une IA a-t-elle besoin de beaucoup de données ?',
        options: [
          'Pour apprendre des patterns',
          'Pour occuper de l\'espace disque',
          'Pour faire joli'
        ],
        correctAnswer: 'Pour apprendre des patterns',
        explanation: 'Comme un humain qui apprend en voyant beaucoup d\'exemples, l\'IA a besoin de données pour reconnaître des motifs',
      },
    ],
  },

  // Programmation 14-15 ans
  {
    id: 'prog-1-1',
    title: 'Python : les structures de base',
    description: 'Maîtrise les fondamentaux de Python',
    subject: 'Programmation',
    ageRange: '14-15 ans',
    level: 'Avancé',
    duration: '60 min',
    isPro: true,
    exercises: [
      {
        id: 'prog-1-1-ex1',
        type: 'drag',
        question: 'Remets les lignes de code dans le bon ordre pour créer une fonction qui calcule la moyenne',
        items: [
          'def calculer_moyenne(nombres):',
          '    total = sum(nombres)',
          '    nombre_elements = len(nombres)',
          '    return total / nombre_elements',
          'print(calculer_moyenne([10, 15, 20]))'
        ],
        correctAnswer: '',
        explanation: 'Une fonction suit une structure logique : définition, calculs, et retour du résultat',
        hint: 'Commence par la définition de la fonction (def)',
      },
      {
        id: 'prog-1-1-ex2',
        type: 'memory',
        question: 'Associe chaque concept à son exemple',
        pairs: [
          { question: 'Variable', answer: 'x = 42' },
          { question: 'Liste', answer: '[1, 2, 3]' },
          { question: 'Dictionnaire', answer: '{"nom": "Alice"}' },
          { question: 'Boucle', answer: 'for i in range(5):' },
        ],
        correctAnswer: '',
        explanation: 'Python utilise différentes structures de données pour organiser l\'information',
      },
      {
        id: 'prog-1-1-ex3',
        type: 'qcm',
        question: 'Quel est le résultat de : [1, 2, 3] + [4, 5] ?',
        options: [
          '[1, 2, 3, 4, 5]',
          '[5, 7, 8]',
          'Erreur'
        ],
        correctAnswer: '[1, 2, 3, 4, 5]',
        explanation: 'En Python, le + avec des listes les concatène (les met bout à bout)',
        hint: 'Pense à ce que fait + avec des chaînes de caractères',
      },
      {
        id: 'prog-1-1-ex4',
        type: 'puzzle',
        question: 'Reconstitue l\'algorithme de tri à bulles',
        imageUrl: '/katiopa/images/exercises/bubble-sort.png',
        correctAnswer: '',
        explanation: 'Le tri à bulles compare et échange les éléments adjacents jusqu\'à ce que la liste soit triée',
        hint: 'Les plus grands éléments "remontent" comme des bulles',
      },
      {
        id: 'prog-1-1-ex5',
        type: 'text',
        question: 'Quelle sera la valeur de x après : x = "Hello"[1:4] ?',
        correctAnswer: 'ell',
        explanation: 'Le slicing en Python prend les caractères de l\'index 1 (inclus) à 4 (exclu)',
        hint: 'Les index commencent à 0, et la borne supérieure est exclue',
      },
    ],
  },
];

export default function LearningPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAge = !selectedAgeRange || course.ageRange === selectedAgeRange;
    return matchesSearch && matchesAge;
  });

  const handleCourseClick = (course: Course) => {
    if (course.isPro && !session) {
      toast({
        title: 'Contenu PRO',
        description: 'Abonnez-vous pour accéder à ce contenu',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setSelectedCourse(course);
    setCurrentExerciseIndex(0);
    setUserAnswer('');
    setIsCorrect(null);
    setShowExplanation(false);
  };

  const handleAnswerSubmit = () => {
    if (!selectedCourse) return;
    
    const currentExercise = selectedCourse.exercises[currentExerciseIndex];
    const correct = userAnswer.toLowerCase() === String(currentExercise.correctAnswer).toLowerCase();
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const handleNextExercise = () => {
    if (!selectedCourse) return;
    
    if (currentExerciseIndex < selectedCourse.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setUserAnswer('');
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      setSelectedCourse(null);
      setCurrentExerciseIndex(0);
    }
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const handleExerciseComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 10);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      
      toast({
        title: 'Bravo !',
        description: 'Tu as gagné 10 points !',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box minH="100vh" pt="80px" pb="20px" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="1200px">
        <VStack spacing={8} align="stretch">
          {/* En-tête et recherche */}
          <Box>
            <Heading mb={4} size="xl" bgGradient="linear(to-r, brand.500, secondary.500)" bgClip="text">
              Bac à sable
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={6}>
              Explorez et expérimentez avec nos activités interactives
            </Text>
            
            <HStack spacing={4} mb={8}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Rechercher un cours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  borderRadius="full"
                />
              </InputGroup>
              
              <Select
                placeholder="Filtrer par âge"
                value={selectedAgeRange}
                onChange={(e) => setSelectedAgeRange(e.target.value)}
                borderRadius="full"
                w="200px"
              >
                {ageRanges.map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </Select>
            </HStack>
          </Box>

          {/* Onglets par matière */}
          <Tabs variant="soft-rounded" colorScheme="brand">
            <TabList mb={4} overflowX="auto" css={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}>
              <Tab>Tous</Tab>
              {subjects.map((subject) => (
                <Tab key={subject.name}>
                  <HStack spacing={2}>
                    <Icon as={subject.icon} />
                    <Text>{subject.name}</Text>
                  </HStack>
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              {/* Panneau "Tous" */}
              <TabPanel p={0}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {filteredCourses.map((course) => (
                    <Card
                      key={course.id}
                      border="1px"
                      borderColor={borderColor}
                      borderRadius="xl"
                      overflow="hidden"
                      transition="all 0.2s"
                      _hover={{
                        transform: 'translateY(-4px)',
                        shadow: 'lg',
                        bg: cardHoverBg,
                      }}
                      cursor="pointer"
                      onClick={() => handleCourseClick(course)}
                      position="relative"
                    >
                      {course.isPro && (
                        <Badge
                          position="absolute"
                          top={2}
                          right={2}
                          colorScheme="purple"
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <Icon as={FaLock} w={3} h={3} />
                          PRO
                        </Badge>
                      )}
                      <CardBody>
                        <VStack align="start" spacing={3}>
                          <Heading size="md">{course.title}</Heading>
                          <Text color="gray.600">{course.description}</Text>
                          <HStack spacing={2}>
                            <Tag colorScheme="brand">{course.ageRange}</Tag>
                            <Tag colorScheme="gray">{course.level}</Tag>
                            <Tag colorScheme="blue">{course.duration}</Tag>
                          </HStack>
                          <Text fontSize="sm" color="gray.500">
                            {course.exercises.length} exercices
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </TabPanel>

              {/* Panneaux par matière */}
              {subjects.map((subject) => (
                <TabPanel key={subject.name} p={0}>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filteredCourses
                      .filter(course => course.subject === subject.name)
                      .map((course) => (
                        <Card
                          key={course.id}
                          border="1px"
                          borderColor={borderColor}
                          borderRadius="xl"
                          overflow="hidden"
                          transition="all 0.2s"
                          _hover={{
                            transform: 'translateY(-4px)',
                            shadow: 'lg',
                            bg: cardHoverBg,
                          }}
                          cursor="pointer"
                          onClick={() => handleCourseClick(course)}
                          position="relative"
                        >
                          {course.isPro && (
                            <Badge
                              position="absolute"
                              top={2}
                              right={2}
                              colorScheme="purple"
                              display="flex"
                              alignItems="center"
                              gap={1}
                            >
                              <Icon as={FaLock} w={3} h={3} />
                              PRO
                            </Badge>
                          )}
                          <CardBody>
                            <VStack align="start" spacing={3}>
                              <Heading size="md">{course.title}</Heading>
                              <Text color="gray.600">{course.description}</Text>
                              <HStack spacing={2}>
                                <Tag colorScheme="brand">{course.ageRange}</Tag>
                                <Tag colorScheme="gray">{course.level}</Tag>
                                <Tag colorScheme="blue">{course.duration}</Tag>
                              </HStack>
                              <Text fontSize="sm" color="gray.500">
                                {course.exercises.length} exercices
                              </Text>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                  </SimpleGrid>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>

      {selectedCourse && (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          w="full"
          h="full"
          position="fixed"
          top="0"
          left="0"
          bg={useColorModeValue('white', 'gray.800')}
          zIndex="modal"
          overflow="hidden"
        >
          <Container maxW="1200px" h="full" pt="20px">
            <VStack spacing={6} h="full">
              {/* En-tête de l'exercice */}
              <Flex w="full" justify="space-between" align="center">
                <IconButton
                  aria-label="Retour"
                  icon={<FaArrowLeft />}
                  onClick={() => setSelectedCourse(null)}
                  variant="ghost"
                />
                <HStack>
                  <Text fontSize="xl" fontWeight="bold">Score: {score}</Text>
                  <Icon as={FaStar} color="yellow.400" w={6} h={6} />
                </HStack>
              </Flex>

              {/* Contenu de l'exercice */}
              <Flex
                flex="1"
                w="full"
                direction="column"
                align="center"
                justify="center"
                position="relative"
                p={8}
                borderRadius="xl"
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow="xl"
              >
                {selectedCourse.exercises[currentExerciseIndex].imageUrl && (
                  <Image
                    src={selectedCourse.exercises[currentExerciseIndex].imageUrl}
                    alt="Exercise illustration"
                    maxH="300px"
                    mb={6}
                  />
                )}

                <Heading size="lg" mb={6} textAlign="center">
                  {selectedCourse.exercises[currentExerciseIndex].question}
                </Heading>

                {selectedCourse.exercises[currentExerciseIndex].audioUrl && (
                  <IconButton
                    aria-label="Écouter"
                    icon={<FaVolumeUp />}
                    onClick={() => playAudio(selectedCourse.exercises[currentExerciseIndex].audioUrl!)}
                    colorScheme="brand"
                    size="lg"
                    mb={4}
                  />
                )}

                {/* Contenu spécifique selon le type d'exercice */}
                {selectedCourse.exercises[currentExerciseIndex].type === 'qcm' && (
                  <RadioGroup value={userAnswer} onChange={setUserAnswer}>
                    <Stack spacing={2}>
                      {selectedCourse.exercises[currentExerciseIndex].options?.map((option) => (
                        <Radio key={option} value={option}>
                          {option}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                )}

                {selectedCourse.exercises[currentExerciseIndex].type === 'number' && (
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Entre ta réponse..."
                  />
                )}

                {selectedCourse.exercises[currentExerciseIndex].type === 'text' && (
                  <Input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Entre ta réponse..."
                  />
                )}

                {selectedCourse.exercises[currentExerciseIndex].type === 'drag' && (
                  <DragExercise
                    items={selectedCourse.exercises[currentExerciseIndex].items || []}
                    onComplete={handleExerciseComplete}
                  />
                )}

                {selectedCourse.exercises[currentExerciseIndex].type === 'memory' && (
                  <MemoryExercise
                    pairs={selectedCourse.exercises[currentExerciseIndex].pairs || []}
                    onComplete={handleExerciseComplete}
                  />
                )}

                {selectedCourse.exercises[currentExerciseIndex].type === 'puzzle' && (
                  <PuzzleExercise
                    imageUrl={selectedCourse.exercises[currentExerciseIndex].imageUrl || ''}
                    onComplete={handleExerciseComplete}
                  />
                )}

                {selectedCourse.exercises[currentExerciseIndex].type === 'ludo' && (
                  <LudoGame
                    difficulty={selectedCourse.exercises[currentExerciseIndex].difficulty as 'easy' | 'medium' | 'hard'}
                    onComplete={handleExerciseComplete}
                  />
                )}

                {!showExplanation && (
                  <Button
                    colorScheme="brand"
                    onClick={handleAnswerSubmit}
                    isDisabled={!userAnswer}
                  >
                    Vérifier
                  </Button>
                )}

                {showExplanation && (
                  <VStack spacing={4} align="stretch">
                    <Box
                      p={4}
                      bg={isCorrect ? 'green.100' : 'red.100'}
                      color={isCorrect ? 'green.700' : 'red.700'}
                      borderRadius="md"
                    >
                      <HStack>
                        <Icon
                          as={isCorrect ? FaTrophy : FaLock}
                          w={5}
                          h={5}
                        />
                        <Text fontWeight="bold">
                          {isCorrect ? 'Bravo !' : 'Essaie encore !'}
                        </Text>
                      </HStack>
                      <Text mt={2}>
                        {selectedCourse.exercises[currentExerciseIndex].explanation}
                      </Text>
                    </Box>
                    
                    <Button
                      colorScheme="brand"
                      onClick={handleNextExercise}
                    >
                      {currentExerciseIndex < selectedCourse.exercises.length - 1
                        ? 'Exercice suivant'
                        : 'Terminer'}
                    </Button>
                  </VStack>
                )}

                {showCelebration && (
                  <MotionFlex
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    justify="center"
                    align="center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <Icon
                        key={i}
                        as={FaStar}
                        position="absolute"
                        color="yellow.400"
                        w={8}
                        h={8}
                        animation={`${twinkle} 1s infinite ${i * 0.1}s`}
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                  </MotionFlex>
                )}
              </Flex>

              {/* Navigation entre exercices */}
              <Flex w="full" justify="space-between" p={4}>
                <Button
                  leftIcon={<FaArrowLeft />}
                  onClick={() => setCurrentExerciseIndex(prev => prev - 1)}
                  isDisabled={currentExerciseIndex === 0}
                >
                  Précédent
                </Button>
                <Button
                  rightIcon={<FaArrowRight />}
                  onClick={() => setCurrentExerciseIndex(prev => prev + 1)}
                  isDisabled={currentExerciseIndex === selectedCourse.exercises.length - 1}
                  colorScheme="brand"
                >
                  Suivant
                </Button>
              </Flex>
            </VStack>
          </Container>
        </MotionBox>
      )}
    </Box>
  );
} 