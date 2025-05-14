import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Icon,
  SimpleGrid,
  VStack,
  Flex,
  Button,
  HStack,
} from '@chakra-ui/react';
import {
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaGithub,
  FaEnvelope,
  FaUserPlus,
  FaSignInAlt,
} from 'react-icons/fa';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export function Footer() {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconColor = useColorModeValue('gray.400', 'gray.500');
  const hoverColor = useColorModeValue('purple.500', 'purple.300');
  const bgColor = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(26, 32, 44, 0.8)'
  );
  const router = useRouter();

  const sections = [
    {
      title: "Produits",
      links: [
        { label: "Espace Apprentissage", href: "/learning-pool" },
        { label: "Jeux Éducatifs", href: "/games" },
        { label: "Créer", href: "/create" },
        { label: "Chatter avec Okapi notre IA", href: "/chat" },
      ]
    },
    {
      title: "Ressources",
      links: [
        { label: "À propos", href: "/about" },
        { label: "FAQ", href: "/faq" },
        { label: "Aide", href: "/help" },
      ]
    },
    {
      title: "Légal",
      links: [
        { label: "Conditions d'utilisation", href: "/auth/terms" },
        { label: "Politique de confidentialité", href: "/auth/privacy" },
        { label: "Mentions légales", href: "/auth/legal" },
        { label: "Cookies", href: "/auth/cookies" },
      ]
    }
  ];

  const socialLinks = [
    { icon: FaTwitter, href: 'https://twitter.com/katiopa', label: 'Twitter' },
    { icon: FaDiscord, href: 'https://discord.gg/katiopa', label: 'Discord' },
    { icon: FaGithub, href: 'https://github.com/katiopa', label: 'GitHub' },
    { icon: FaYoutube, href: 'https://youtube.com/@katiopa', label: 'YouTube' },
  ];

  return (
    <Box
      as="footer"
      position="relative"
      borderTop="1px"
      borderColor={borderColor}
      backdropFilter="blur(8px)"
      bg={bgColor}
    >
      <Container maxW="7xl" py={8}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          spacing={8}
          mb={8}
        >
          <VStack align="start" spacing={4}>
            <Text
              bgGradient="linear(to-r, blue.400, purple.400)"
              bgClip="text"
              fontSize="xl"
              fontWeight="bold"
            >
              Katiopa
            </Text>
            <Text fontSize="sm" color={textColor}>
              La plateforme éducative qui rend l'apprentissage amusant et interactif.
            </Text>
            <Button
              as={Link}
              href="mailto:contact@katiopa.com"
              leftIcon={<Icon as={FaEnvelope} />}
              size="sm"
              variant="ghost"
              color={textColor}
              _hover={{
                color: hoverColor,
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              contact@katiopa.com
            </Button>
            <Text fontSize="sm" color={textColor} pt={2}>
              Nouveau sur Katiopa ?{' '}
              <Link
                as={NextLink}
                href="/auth/register"
                color="brand.500"
                fontWeight="normal"
                _hover={{ color: 'brand.600', textDecoration: 'underline', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                aria-label="S'inscrire sur Katiopa"
              >
                Cliquez ici pour créer un compte gratuitement
              </Link>
            </Text>
          </VStack>

          {sections.map((section) => (
            <VStack key={section.title} align="start" spacing={4}>
              <Text
                color={textColor}
                fontWeight="medium"
                fontSize="sm"
              >
                {section.title}
              </Text>
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  as={NextLink}
                  href={link.href}
                  fontSize="sm"
                  color={textColor}
                  _hover={{
                    color: hoverColor,
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </VStack>
          ))}
        </SimpleGrid>

        <Box
          pt={8}
          borderTop="1px"
          borderColor={borderColor}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text
              fontSize="sm"
              color={textColor}
            >
              © 2024 Katiopa. Tous droits réservés
            </Text>

            <Stack
              direction="row"
              spacing={4}
              align="center"
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  isExternal
                  color={iconColor}
                  _hover={{
                    color: hoverColor,
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  <Icon
                    as={social.icon}
                    boxSize={5}
                    aria-label={social.label}
                  />
                </Link>
              ))}
            </Stack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
} 