import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Badge,
  useColorModeValue,
  Image,
  chakra,
} from '@chakra-ui/react';
import { FaGamepad, FaUsers, FaRobot, FaLightbulb, FaChartLine, FaComments, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import { motion, useAnimation, useInView } from 'framer-motion';
import { type Transition } from 'framer-motion';
import { useRef, useEffect } from 'react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const MotionBox = motion(Box);

const FeatureCard = ({ icon, title, description, delay = 0 }: { icon: any; title: string; description: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: '50px'
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay
        } as Transition
      });
    }
  }, [controls, isInView, delay]);

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={controls}
      whileHover={{ 
        y: -8,
        transition: {
          type: "tween",
          duration: 0.3
        } as Transition
      }}
      whileTap={{ scale: 0.98 }}
      p={{ base: 4, md: 6 }}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="2xl"
      boxShadow="xl"
      position="relative"
      overflow="hidden"
      style={{
        willChange: 'transform',
        perspective: '1000px'
      }}
    >
      <Icon as={icon} w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} color="brand.500" mb={{ base: 3, md: 4 }} />
      <Heading size={{ base: "sm", md: "md" }} mb={{ base: 1, md: 2 }}>
        {title}
      </Heading>
      <Box color={useColorModeValue('gray.600', 'gray.400')} fontSize={{ base: "sm", md: "md" }}>
        {description}
      </Box>
    </MotionBox>
  );
};

const GameCard = ({ title, description, image }: { title: string; description: string; image: string }) => (
  <Box
    position="relative"
    borderRadius="2xl"
    overflow="hidden"
    boxShadow="xl"
    transition="all 0.3s"
    _hover={{
      transform: 'translateY(-4px)',
      boxShadow: '2xl',
    }}
    animation={`${fadeIn} 0.5s ease-out`}
  >
    <Image
      src={image}
      alt={title}
      objectFit="cover"
      w="full"
      h="200px"
    />
    <Box p={6} bg={useColorModeValue('white', 'gray.800')}>
      <Badge colorScheme="purple" mb={2}>
        Gratuit
      </Badge>
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Box color={useColorModeValue('gray.600', 'gray.400')}>
        {description}
      </Box>
    </Box>
  </Box>
);

const CommunityPreview = () => (
  <Box
    position="relative"
    borderRadius="2xl"
    overflow="hidden"
    boxShadow="xl"
    transition="all 0.3s"
    _hover={{
      transform: 'translateY(-4px)',
      boxShadow: '2xl',
    }}
    animation={`${fadeIn} 0.5s ease-out`}
  >
    <Image
      src="/katiopa/images/community.jpeg"
      alt="Communauté"
      objectFit="cover"
      w="full"
      h="300px"
    />
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      p={6}
      bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
    >
      <Heading size="md" color="white" mb={2}>
        Rejoignez Notre Communauté
      </Heading>
      <Box color="whiteAlpha.900">
        Partagez vos créations et découvrez celles des autres
      </Box>
    </Box>
  </Box>
);

const HeroContent = () => {
  const router = useRouter();
  const { locale } = router;
  
  const content = {
    fr: {
      title: "Katiopa",
      subtitle: "L'aventure éducative magique",
      description: [
        "Katiopa est une plateforme magique d'apprentissage conçue pour éveiller les esprits curieux des enfants de 5 à 15 ans.",
        "Programmation, intelligence artificielle, mathématiques, sciences et accompagnement aux devoirs : tout devient un jeu passionnant avec notre assistant IA Okapi !",
        "En solo ou avec les parents, chaque enfant progresse à son rythme et peut même lancer des défis à toute la communauté Katiopa.",
        "Bienvenue dans un parc d'attractions éducatif où chaque défi est une nouvelle aventure !"
      ],
      cta: {
        primary: "Commencer l'aventure",
        secondary: "Découvrir"
      }
    },
    en: {
      title: "Katiopa",
      subtitle: "The Magical Learning Adventure",
      description: [
        "Katiopa is a magical learning platform designed to spark curiosity in children aged 5 to 15.",
        "Programming, artificial intelligence, mathematics, science and homework support: everything becomes an exciting game with our AI assistant Okapi!",
        "Solo or with parents, each child progresses at their own pace and can even challenge the entire Katiopa community.",
        "Welcome to an educational theme park where every challenge is a new adventure!"
      ],
      cta: {
        primary: "Start the Adventure",
        secondary: "Discover"
      }
    }
  };

  const currentContent = content[locale as keyof typeof content] || content.fr;
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const subtitleColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack 
      align="start" 
      spacing={{ base: 6, md: 8 }} 
      flex={1} 
      w="full"
      maxW={{ base: "100%", md: "600px" }}
      pt={{ base: 8, md: 0 }}
      position="relative"
      zIndex={2}
    >
      <VStack align="start" spacing={{ base: 3, md: 4 }} w="full">
        <chakra.h1
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight={{ base: "1.1", md: "1.2" }}
          bgGradient="linear(to-r, brand.500, secondary.500, accent.500)"
          bgClip="text"
          mb={{ base: 2, md: 3 }}
          wordBreak="break-word"
        >
          {currentContent.title}
        </chakra.h1>
        <chakra.h2
          fontSize={{ base: "xl", md: "3xl" }}
          color={subtitleColor}
          fontWeight="medium"
          lineHeight={{ base: "1.2", md: "1.3" }}
          wordBreak="break-word"
        >
          {currentContent.subtitle}
        </chakra.h2>
      </VStack>

      <VStack 
        spacing={{ base: 4, md: 5 }} 
        align="start"
        w="full"
      >
        {currentContent.description.map((paragraph, index) => (
          <Text 
            key={index} 
            lineHeight="tall"
            fontSize={{ base: "md", md: "lg" }}
            color={textColor}
            fontWeight={index === 0 ? "medium" : "normal"}
          >
            {paragraph}
          </Text>
        ))}
      </VStack>

      <HStack 
        spacing={{ base: 4, md: 6 }} 
        pt={{ base: 6, md: 8 }}
        w="full"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Button
          size="lg"
          colorScheme="brand"
          rightIcon={<FaGamepad />}
          onClick={() => router.push('/auth/register')}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          w={{ base: "full", sm: "auto" }}
          h="56px"
          px={8}
          fontSize="lg"
        >
          {currentContent.cta.primary}
        </Button>
        <Button
          size="lg"
          variant="outline"
          rightIcon={<FaUsers />}
          onClick={() => router.push('/about')}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            bg: useColorModeValue('gray.50', 'whiteAlpha.100')
          }}
          w={{ base: "full", sm: "auto" }}
          h="56px"
          px={8}
          fontSize="lg"
        >
          {currentContent.cta.secondary}
        </Button>
      </HStack>
    </VStack>
  );
};

export default function Home() {
  const bgGradient = useColorModeValue(
    'linear(to-br, rgba(255,255,255,0.9), rgba(240,240,255,0.9), rgba(230,240,255,0.9))',
    'linear(to-br, rgba(20,20,30,0.9), rgba(30,30,45,0.9), rgba(25,35,50,0.9))'
  );

  const features = [
    {
      icon: FaRobot,
      title: "Assistant IA Okapi",
      description: "Un compagnon d'apprentage intelligent qui s'adapte au niveau de chaque enfant."
    },
    {
      icon: FaLightbulb,
      title: "Apprentissage Ludique",
      description: "Des défis éducatifs qui transforment les matières scolaires en aventures passionnantes."
    },
    {
      icon: FaUsers,
      title: "Duo Parent-Enfant",
      description: "Partagez des moments d'apprentissage uniques et suivez les progrès ensemble."
    }
  ];

  const games = [
    {
      title: "Code Magique",
      description: "Découvre la programmation en créant tes propres sorts magiques !",
      image: "/katiopa/images/spatial.png"
    },
    {
      title: "Math Quest",
      description: "Une aventure où les mathématiques deviennent des super-pouvoirs.",
      image: "/katiopa/images/puzzle.png"
    },
    {
      title: "Science Lab",
      description: "Explore le monde des sciences à travers des expériences fascinantes.",
      image: "/katiopa/images/cours extreme.jpeg"
    }
  ];

  const router = useRouter();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        position="relative"
        overflow="hidden"
        minH={{ base: "100vh", md: "calc(100vh - 80px)" }}
        display="flex"
        alignItems="center"
        pt={{ base: "80px", md: 0 }}
        pb={{ base: 8, md: 0 }}
      >
        {/* Background Image */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage="url('/katiopa/images/hero-bg.webp')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          filter="blur(8px)"
          transform="scale(1.1)"
          zIndex={0}
        />

        {/* Gradient Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient={bgGradient}
          zIndex={1}
        />

        <Container 
          maxW="container.xl" 
          px={{ base: 4, md: 8 }}
          position="relative"
          zIndex={2}
        >
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align={{ base: "center", lg: "center" }}
            justify="space-between"
            gap={{ base: 8, md: 12 }}
            minH={{ base: "auto", md: "calc(100vh - 160px)" }}
          >
            <HeroContent />
            <Box 
              flex={{ base: "none", lg: 1 }}
              position="relative"
              w={{ base: "full", lg: "auto" }}
              maxW={{ base: "600px", lg: "500px" }}
              mt={{ base: 4, lg: 0 }}
            >
              <Image
                src="/katiopa/images/hero.webp"
                alt="Katiopa Educational Platform"
                borderRadius="2xl"
                objectFit="cover"
                w="full"
                h={{ base: "300px", sm: "400px", md: "500px" }}
                boxShadow="2xl"
                transform="perspective(1000px) rotateY(-5deg)"
                transition="transform 0.3s ease-in-out"
                _hover={{
                  transform: "perspective(1000px) rotateY(0deg)"
                }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box 
        py={{ base: 10, md: 20 }} 
        px={{ base: 4, md: 8 }}
        bg={useColorModeValue('gray.50', 'gray.900')}
      >
        <Container maxW="container.xl" px={{ base: 0, md: 8 }}>
          <VStack spacing={{ base: 8, md: 12 }} align="center">
            <VStack spacing={{ base: 3, md: 4 }} textAlign="center" maxW="800px">
              <Heading 
                size={{ base: "lg", md: "xl" }}
                lineHeight={{ base: "1.2", md: "1.3" }}
              >
                La magie de l'apprentissage
              </Heading>
              <Text 
                fontSize={{ base: "sm", md: "lg" }}
                color={useColorModeValue('gray.600', 'gray.400')}
                px={{ base: 4, md: 0 }}
              >
                Découvrez comment Katiopa transforme l'éducation en aventure magique
              </Text>
            </VStack>

            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 6, md: 8 }}
              w="full"
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.2}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Games Section */}
      <Box 
        py={{ base: 10, md: 20 }}
        px={{ base: 4, md: 8 }}
      >
        <Container maxW="container.xl" px={{ base: 0, md: 8 }}>
          <VStack spacing={{ base: 8, md: 12 }} align="stretch">
            <VStack align="start" spacing={{ base: 2, md: 4 }}>
              <Heading 
                size={{ base: "lg", md: "xl" }}
                lineHeight={{ base: "1.2", md: "1.3" }}
              >
                Nos Aventures Éducatives
              </Heading>
              <Text 
                fontSize={{ base: "sm", md: "lg" }}
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Chaque jeu est une nouvelle opportunité d'apprendre en s'amusant
              </Text>
            </VStack>

            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 6, md: 8 }}
              w="full"
            >
              {games.map((game, index) => (
                <GameCard
                  key={index}
                  title={game.title}
                  description={game.description}
                  image={game.image}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Community Section */}
      <Box 
        py={{ base: 10, md: 20 }}
        px={{ base: 4, md: 8 }}
        bg={useColorModeValue('gray.50', 'gray.900')}
      >
        <Container maxW="container.xl" px={{ base: 0, md: 8 }}>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            justify="space-between"
            gap={{ base: 8, md: 12 }}
          >
            <Box 
              flex={{ base: "none", lg: 1 }}
              w="full"
              maxW={{ base: "full", lg: "600px" }}
            >
              <CommunityPreview />
            </Box>
            <VStack 
              align={{ base: "center", lg: "start" }}
              spacing={{ base: 6, md: 8 }}
              flex={1}
              textAlign={{ base: "center", lg: "left" }}
            >
              <Heading 
                size={{ base: "lg", md: "xl" }}
                lineHeight={{ base: "1.2", md: "1.3" }}
              >
                Une Communauté Magique
              </Heading>
              <Text 
                fontSize={{ base: "sm", md: "lg" }}
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Rejoignez une communauté bienveillante où parents et enfants partagent leurs succès et s'encouragent mutuellement.
              </Text>
              <Button
                size={{ base: "md", md: "lg" }}
                colorScheme="purple"
                rightIcon={<FaUsers />}
                onClick={() => router.push('/community')}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                w={{ base: "full", md: "auto" }}
              >
                Rejoindre l'aventure
              </Button>
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
} 