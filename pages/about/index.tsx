import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  useColorModeValue,
  Flex,
  Icon,
  Card,
  CardBody,
  Divider,
  chakra,
} from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionContainer = motion(Container);

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Martin",
    role: "Fondatrice & CEO",
    image: "/team/sarah.jpg",
    bio: "Passionnée d'éducation et de technologie, Sarah a créé Katiopa pour révolutionner l'apprentissage.",
    social: {
      linkedin: "https://linkedin.com/in/sarah-martin",
      twitter: "https://twitter.com/sarah_martin"
    }
  },
  {
    name: "Marc Dubois",
    role: "CTO",
    image: "/team/marc.jpg",
    bio: "Expert en IA et en développement, Marc dirige le développement technique de Katiopa.",
    social: {
      github: "https://github.com/marcdubois",
      linkedin: "https://linkedin.com/in/marc-dubois"
    }
  },
  {
    name: "Emma Chen",
    role: "Lead Designer",
    image: "/team/emma.jpg",
    bio: "Designer UX/UI expérimentée, Emma crée des expériences d'apprentissage intuitives et engageantes.",
    social: {
      linkedin: "https://linkedin.com/in/emma-chen",
      twitter: "https://twitter.com/emma_designs"
    }
  }
];

const AboutPage: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const gradientStart = useColorModeValue('#0066FF', '#0066FF');
  const gradientEnd = useColorModeValue('#0066FF', '#0066FF');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
  const borderColor = useColorModeValue('rgba(0, 102, 255, 0.3)', 'rgba(0, 102, 255, 0.3)');

  return (
    <AnimatePresence>
      <Box position="relative" overflow="hidden">
        {/* Background radial effect */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="150vw"
          height="150vw"
          bgGradient={`radial(circle at center, ${gradientStart}15, transparent 70%)`}
          pointerEvents="none"
          zIndex={0}
        />
        <MotionContainer
          maxW="8xl"
          px={{ base: 4, md: 8 }}
          py={32}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          position="relative"
          zIndex={1}
        >
          {/* Section Vision avec effet parallaxe */}
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            mb={32}
            position="relative"
          >
            <VStack spacing={8} align="center" textAlign="center" position="relative">
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl" }}
                bgGradient={`linear(to-r, ${gradientStart}, ${gradientEnd})`}
                bgClip="text"
                letterSpacing="tight"
                lineHeight="1.2"
                fontWeight="extrabold"
              >
                Notre Vision
              </Heading>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                color={textColor}
                lineHeight="tall"
                maxW="3xl"
                fontWeight="medium"
              >
                Katiopa est née d'une vision simple mais ambitieuse : rendre l'apprentissage accessible, 
                engageant et efficace pour tous. Notre plateforme combine l'intelligence artificielle, 
                la gamification et des méthodes pédagogiques innovantes pour créer une expérience 
                d'apprentissage unique.
              </Text>
            </VStack>
          </MotionBox>

          <Divider my={20} borderColor={dividerColor} />

          {/* Section Valeurs simplifiée */}
          <VStack spacing={16} align="stretch">
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              textAlign="center"
              color={headingColor}
            >
              Nos Valeurs
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {[
                {
                  title: "Innovation",
                  description: "Nous repoussons constamment les limites de la technologie éducative pour offrir les meilleures solutions d'apprentissage."
                },
                {
                  title: "Accessibilité",
                  description: "Nous croyons que l'éducation de qualité devrait être accessible à tous, partout dans le monde."
                },
                {
                  title: "Excellence",
                  description: "Nous nous engageons à fournir un contenu éducatif de haute qualité et une expérience utilisateur exceptionnelle."
                }
              ].map((value, index) => (
                <MotionBox
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  textAlign="center"
                >
                  <VStack spacing={6}>
                    <Box
                      w={20}
                      h={20}
                      borderRadius="full"
                      bgGradient={`linear(to-r, ${gradientStart}, ${gradientEnd})`}
                      opacity={0.1}
                      mb={4}
                    />
                    <Heading 
                      size="lg" 
                      color={headingColor}
                      bgGradient={`linear(to-r, ${gradientStart}, ${gradientEnd})`}
                      bgClip="text"
                    >
                      {value.title}
                    </Heading>
                    <Text 
                      color={textColor} 
                      fontSize="lg"
                      lineHeight="tall"
                    >
                      {value.description}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>

          <Divider my={20} borderColor={dividerColor} />

          {/* Section Équipe avec effet de carte */}
          <VStack spacing={16} align="stretch">
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              textAlign="center"
              color={headingColor}
            >
              L'Équipe
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
              {teamMembers.map((member, index) => (
                <MotionBox
                  key={member.name}
                  position="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ transform: 'translateY(-8px)' }}
                  p={6}
                  borderRadius="2xl"
                  bg="rgba(255, 255, 255, 0.05)"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '2xl',
                    bgGradient: `linear(to-b, ${gradientStart}, ${gradientEnd})`,
                    opacity: 0.05,
                    zIndex: -1,
                  }}
                >
                  <VStack spacing={6}>
                    <Box 
                      position="relative" 
                      w="full" 
                      h="180px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        borderRadius="full"
                        boxSize="160px"
                        objectFit="cover"
                        fallbackSrc="https://via.placeholder.com/150"
                        border="4px solid"
                        borderColor={borderColor}
                        transition="all 0.3s ease"
                        _hover={{
                          transform: 'scale(1.05)',
                          borderColor: gradientStart,
                        }}
                      />
                    </Box>
                    <VStack spacing={3}>
                      <Heading 
                        size="lg" 
                        color={headingColor}
                        bgGradient={`linear(to-r, ${gradientStart}, ${gradientEnd})`}
                        bgClip="text"
                      >
                        {member.name}
                      </Heading>
                      <Text 
                        color="purple.500" 
                        fontSize="lg" 
                        fontWeight="bold"
                        letterSpacing="wide"
                      >
                        {member.role}
                      </Text>
                      <Text 
                        color={textColor} 
                        textAlign="center" 
                        fontSize="md"
                        lineHeight="tall"
                      >
                        {member.bio}
                      </Text>
                      <Flex gap={6} pt={4}>
                        {member.social.linkedin && (
                          <Icon
                            as={FaLinkedin}
                            boxSize={6}
                            color={textColor}
                            cursor="pointer"
                            _hover={{ 
                              color: 'blue.500', 
                              transform: 'scale(1.1)',
                              filter: 'brightness(1.2)'
                            }}
                            transition="all 0.2s"
                            onClick={() => window.open(member.social.linkedin, '_blank')}
                          />
                        )}
                        {member.social.github && (
                          <Icon
                            as={FaGithub}
                            boxSize={6}
                            color={textColor}
                            cursor="pointer"
                            _hover={{ 
                              color: 'gray.500', 
                              transform: 'scale(1.1)',
                              filter: 'brightness(1.2)'
                            }}
                            transition="all 0.2s"
                            onClick={() => window.open(member.social.github, '_blank')}
                          />
                        )}
                        {member.social.twitter && (
                          <Icon
                            as={FaTwitter}
                            boxSize={6}
                            color={textColor}
                            cursor="pointer"
                            _hover={{ 
                              color: 'blue.400', 
                              transform: 'scale(1.1)',
                              filter: 'brightness(1.2)'
                            }}
                            transition="all 0.2s"
                            onClick={() => window.open(member.social.twitter, '_blank')}
                          />
                        )}
                      </Flex>
                    </VStack>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </MotionContainer>
      </Box>
    </AnimatePresence>
  );
};

export default AboutPage; 