import {
  Box,
  Flex,
  Heading,
  Link,
  Button,
  HStack,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  useDisclosure,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiMenu, FiUser, FiHome, FiUsers, FiBook, FiSettings, FiLogOut } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';
import NextLink from 'next/link';

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const shadow = useColorModeValue('0 4px 6px rgba(0, 0, 0, 0.1)', '0 4px 6px rgba(0, 0, 0, 0.3)');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const menuBg = useColorModeValue('white', 'gray.800');
  const menuHoverBg = useColorModeValue('gray.100', 'gray.700');

  const isActive = (path: string) => router.pathname === path;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <Box
      as="header"
      bg={bgColor}
      boxShadow={shadow}
      position="sticky"
      top={0}
      zIndex={100}
      borderBottom="1px solid"
      borderColor={borderColor}
      borderRadius="0 0 16px 16px"
      backdropFilter="blur(10px)"
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        py={4}
        justify="space-between"
        align="center"
      >
        <Heading
          size="lg"
          fontFamily="heading"
          color="brand.700"
          cursor="pointer"
          onClick={() => router.push('/')}
          _hover={{ transform: 'scale(1.05)', textShadow: '0 0 8px rgba(0, 0, 0, 0.2)' }}
          transition="all 0.2s"
        >
          Katiopa
        </Heading>

        {/* Navigation pour desktop */}
        <HStack
          spacing={8}
          display={{ base: 'none', md: 'flex' }}
        >
          <Link
            href="/"
            fontFamily="body"
            fontWeight={isActive('/') ? 'bold' : 'normal'}
            color={isActive('/') ? 'brand.500' : textColor}
            _hover={{ color: 'brand.500', transform: 'translateY(-2px)' }}
            display="flex"
            alignItems="center"
            gap={2}
            transition="all 0.2s"
            as={NextLink}
          >
            <FiHome />
            Accueil
          </Link>
          <Link
            href="/community"
            fontFamily="body"
            fontWeight={isActive('/community') ? 'bold' : 'normal'}
            color={isActive('/community') ? 'brand.500' : textColor}
            _hover={{ color: 'brand.500', transform: 'translateY(-2px)' }}
            display="flex"
            alignItems="center"
            gap={2}
            transition="all 0.2s"
            as={NextLink}
          >
            <FiUsers />
            Communauté
          </Link>
          <Link
            href="/about"
            fontFamily="body"
            fontWeight={isActive('/about') ? 'bold' : 'normal'}
            color={isActive('/about') ? 'brand.500' : textColor}
            _hover={{ color: 'brand.500', transform: 'translateY(-2px)' }}
            display="flex"
            alignItems="center"
            gap={2}
            transition="all 0.2s"
            as={NextLink}
          >
            <FiBook />
            À propos
          </Link>
        </HStack>

        {/* Menu mobile */}
        <Box display={{ base: 'block', md: 'none' }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiMenu />}
              variant="ghost"
              aria-label="Menu"
            />
            <MenuList bg={menuBg}>
              <MenuItem
                icon={<FiHome />}
                onClick={() => router.push('/')}
                _hover={{ bg: menuHoverBg }}
              >
                Accueil
              </MenuItem>
              <MenuItem
                icon={<FiUsers />}
                onClick={() => router.push('/community')}
                _hover={{ bg: menuHoverBg }}
              >
                Communauté
              </MenuItem>
              <MenuItem
                icon={<FiBook />}
                onClick={() => router.push('/about')}
                _hover={{ bg: menuHoverBg }}
              >
                À propos
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <HStack spacing={4}>
          {status === 'authenticated' ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                p={0}
                _hover={{ bg: 'transparent' }}
              >
                <HStack spacing={3}>
                  <Avatar
                    size="sm"
                    name={session.user?.name || undefined}
                    src={session.user?.image || undefined}
                    bg="brand.500"
                  />
                  <Text
                    display={{ base: 'none', md: 'block' }}
                    fontFamily="body"
                    color={textColor}
                  >
                    {session.user?.name || session.user?.email}
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList bg={menuBg}>
                <MenuItem
                  icon={<FiUser />}
                  onClick={() => router.push('/espace-personnel')}
                  _hover={{ bg: menuHoverBg }}
                >
                  Mon Espace
                </MenuItem>
                <MenuItem
                  icon={<FiSettings />}
                  onClick={() => router.push('/parametres')}
                  _hover={{ bg: menuHoverBg }}
                >
                  Paramètres
                </MenuItem>
                <MenuItem
                  icon={<FiLogOut />}
                  onClick={handleSignOut}
                  _hover={{ bg: menuHoverBg }}
                >
                  Se déconnecter
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              leftIcon={<FiUser />}
              colorScheme="brand"
              variant="outline"
              onClick={() => router.push('/auth/login')}
              _hover={{ transform: 'scale(1.05)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              transition="all 0.2s"
              borderRadius="full"
            >
              Connexion
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header; 