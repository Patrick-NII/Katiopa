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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiMenu, FiUser, FiHome, FiUsers, FiBook } from 'react-icons/fi';

const Header = () => {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const isActive = (path: string) => router.pathname === path;

  return (
    <Box
      as="header"
      bg={bgColor}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={100}
      borderBottom="1px solid"
      borderColor={borderColor}
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
          color="brand.700"
          cursor="pointer"
          onClick={() => router.push('/')}
          _hover={{ transform: 'scale(1.05)' }}
          transition="transform 0.2s"
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
            fontWeight={isActive('/') ? 'bold' : 'normal'}
            color={isActive('/') ? 'brand.500' : 'gray.600'}
            _hover={{ color: 'brand.500' }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <FiHome />
            Accueil
          </Link>
          <Link
            href="/community"
            fontWeight={isActive('/community') ? 'bold' : 'normal'}
            color={isActive('/community') ? 'brand.500' : 'gray.600'}
            _hover={{ color: 'brand.500' }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <FiUsers />
            Communauté
          </Link>
          <Link
            href="/about"
            fontWeight={isActive('/about') ? 'bold' : 'normal'}
            color={isActive('/about') ? 'brand.500' : 'gray.600'}
            _hover={{ color: 'brand.500' }}
            display="flex"
            alignItems="center"
            gap={2}
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
            <MenuList>
              <MenuItem
                icon={<FiHome />}
                onClick={() => router.push('/')}
              >
                Accueil
              </MenuItem>
              <MenuItem
                icon={<FiUsers />}
                onClick={() => router.push('/community')}
              >
                Communauté
              </MenuItem>
              <MenuItem
                icon={<FiBook />}
                onClick={() => router.push('/about')}
              >
                À propos
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <HStack spacing={4}>
          <Button
            leftIcon={<FiUser />}
            colorScheme="brand"
            variant="outline"
            onClick={() => router.push('/login')}
          >
            Connexion
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header; 