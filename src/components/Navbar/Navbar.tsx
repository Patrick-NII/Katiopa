import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  HStack,
  Collapse,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  LinkProps,
  Divider,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';
import { FamilyMembers } from '../FamilyMembers';
import { FaGraduationCap, FaGamepad, FaPencilAlt, FaUsers, FaUser, FaCog, FaSignOutAlt, FaMoon, FaSun, FaHome, FaBook, FaTasks, FaChartLine, FaRocket, FaPuzzlePiece, FaRunning, FaPlus, FaFolder, FaCopy, FaComments, FaTrophy, FaCalendar, FaCrown } from 'react-icons/fa';
import React, { useEffect } from 'react';
import { ROUTES } from '@/config/routes';
import { ProfilePictureUploader } from '../Profile/ProfilePictureUploader';
import styles from '../../styles/navbar.module.css';
import { keyframes } from '@emotion/react';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  icon?: any;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Accueil',
    href: ROUTES.HOME,
    icon: FaHome,
  },
  {
    label: 'Bac à sable',
    href: ROUTES.SANDBOX,
    icon: FaGraduationCap,
  },
  {
    label: 'Jeux',
    href: ROUTES.GAMES.INDEX,
    icon: FaGamepad,
  },
  {
    label: 'Pro',
    href: ROUTES.SUBSCRIPTION.PLANS,
    icon: FaCrown,
  },
];

interface NavLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ children, href, ...props }: NavLinkProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <ChakraLink
        {...props}
        _hover={{
          textDecoration: 'none',
          color: props._hover?.color,
        }}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Ajouter l'interface pour UserMenuItem
interface UserMenuItemProps {
  href: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  [key: string]: any;
}

const UserMenuItem = ({ href, icon, children, ...props }: UserMenuItemProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <MenuItem
        as={ChakraLink}
        icon={icon}
        {...props}
      >
        {children}
      </MenuItem>
    </Link>
  );
};

export default function Navbar() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  // Group all color mode values
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'white');
  const logoColor = useColorModeValue('gray.800', 'white');
  const navBg = useColorModeValue(
    'rgba(255, 255, 255, 0.95)',
    'rgba(26, 32, 44, 0.95)'
  );
  const menuBg = useColorModeValue('white', 'gray.800');
  const menuBorderColor = useColorModeValue('gray.200', 'gray.700');
  const menuHoverBg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    if (session?.user?.image) {
      update();
    }
  }, [session?.user?.image]);

  return (
    <Box position="fixed" w="full" top={0} zIndex={1000}>
      <Flex
        bg={navBg}
        color={textColor}
        h="60px"
        px={4}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={borderColor}
        align={'center'}
        backdropFilter="blur(10px)"
      >
        <Flex flex={1} justify="space-between" align="center" maxW="1200px" mx="auto" w="full">
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={3} h={3} />
              ) : (
                <HamburgerIcon w={5} h={5} />
              )
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            _hover={{
              bg: menuHoverBg
            }}
          />
          
          <Link href="/" passHref legacyBehavior>
            <ChakraLink
              textAlign="center"
              fontFamily={'heading'}
              color={logoColor}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient="linear(to-r, brand.500, secondary.500)"
                bgClip="text"
                display="inline-block"
              >
                Katiopa
              </Text>
            </ChakraLink>
          </Link>

          <IconButton
            size="sm"
            fontSize="lg"
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            variant="ghost"
            color="current"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            _hover={{
              bg: menuHoverBg
            }}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box
          position="fixed"
          left={0}
          right={0}
          top="60px"
          bg={menuBg}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={menuBorderColor}
          shadow="lg"
          maxH="calc(100vh - 60px)"
          overflowY="auto"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)'),
              borderRadius: '24px',
            },
          }}
        >
          <Box maxW="1200px" mx="auto" px={4} py={4}>
            <Stack spacing={4}>
              {session && (
                <Box mb={4}>
                  <HStack spacing={3} mb={4}>
                    <Avatar
                      size={'md'}
                      src={session.user?.image || undefined}
                      name={session.user?.name || undefined}
                      bg="brand.500"
                      color="white"
                    />
                    <Box>
                      <Text fontWeight="bold">{session.user?.name}</Text>
                      <Text fontSize="sm" color={textColor}>{session.user?.email}</Text>
                    </Box>
                  </HStack>
                  <Stack spacing={1}>
                    <Link href={`${router.basePath}${ROUTES.PERSONAL_SPACE}`} passHref legacyBehavior>
                      <ChakraLink
                        p={2}
                        px={3}
                        _hover={{
                          textDecoration: 'none',
                          color: 'brand.500',
                          bg: menuHoverBg,
                        }}
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                      >
                        <HStack spacing={3}>
                          <Icon as={FaUser} w={5} h={5} />
                          <Text fontWeight={500}>Mon Espace</Text>
                        </HStack>
                      </ChakraLink>
                    </Link>
                    <Link href="/parametres" passHref legacyBehavior>
                      <ChakraLink
                        p={2}
                        px={3}
                        _hover={{
                          textDecoration: 'none',
                          color: 'brand.500',
                          bg: menuHoverBg,
                        }}
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                      >
                        <HStack spacing={3}>
                          <Icon as={FaCog} w={5} h={5} />
                          <Text fontWeight={500}>Paramètres</Text>
                        </HStack>
                      </ChakraLink>
                    </Link>
                    <ChakraLink
                      p={2}
                      px={3}
                      onClick={() => signOut()}
                      _hover={{
                        textDecoration: 'none',
                        color: 'brand.500',
                        bg: menuHoverBg,
                      }}
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                    >
                      <HStack spacing={3}>
                        <Icon as={FaSignOutAlt} w={5} h={5} />
                        <Text fontWeight={500}>Se déconnecter</Text>
                      </HStack>
                    </ChakraLink>
                  </Stack>
                </Box>
              )}

              {!session && (
                <Box mb={4}>
                  <Button
                    w="full"
                    colorScheme="brand"
                    onClick={() => signIn()}
                    leftIcon={<Icon as={FaUser} />}
                  >
                    Se connecter
                  </Button>
                </Box>
              )}

              <Divider />

              {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                  {navItem.children ? (
                    <Popover trigger={'hover'} placement={'right-start'}>
                      <PopoverTrigger>
                        <HStack
                          py={2}
                          as={ChakraLink}
                          href={navItem.href ?? '#'}
                          justify={'space-between'}
                          align={'center'}
                          _hover={{
                            textDecoration: 'none',
                            color: 'brand.500',
                            bg: menuHoverBg,
                          }}
                          borderRadius="md"
                          px={3}
                          role="group"
                          transition="all 0.2s"
                        >
                          <HStack spacing={3}>
                            <Icon
                              as={navItem.icon}
                              w={5}
                              h={5}
                              _groupHover={{ color: 'brand.500' }}
                              transition="all 0.2s"
                            />
                            <Text fontWeight={500}>{navItem.label}</Text>
                          </HStack>
                          <Icon
                            as={ChevronRightIcon}
                            w={5}
                            h={5}
                            _groupHover={{ color: 'brand.500' }}
                            transition="all 0.2s"
                          />
                        </HStack>
                      </PopoverTrigger>

                      <PopoverContent
                        border={0}
                        boxShadow={'xl'}
                        bg={menuBg}
                        p={4}
                        rounded={'xl'}
                        minW={'sm'}
                      >
                        <Stack spacing={1}>
                          {navItem.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href || '#'}
                              passHref
                              legacyBehavior
                            >
                              <ChakraLink
                                px={3}
                                py={2}
                                borderRadius="md"
                                _hover={{
                                  textDecoration: 'none',
                                  bg: menuHoverBg,
                                }}
                                transition="all 0.2s"
                              >
                                <HStack spacing={3}>
                                  <Icon
                                    as={child.icon}
                                    w={5}
                                    h={5}
                                    color="brand.500"
                                  />
                                  <Box>
                                    <Text
                                      fontWeight={500}
                                      _hover={{ color: 'brand.500' }}
                                    >
                                      {child.label}
                                    </Text>
                                    {child.subLabel && (
                                      <Text fontSize={'sm'} color={textColor}>
                                        {child.subLabel}
                                      </Text>
                                    )}
                                  </Box>
                                </HStack>
                              </ChakraLink>
                            </Link>
                          ))}
                        </Stack>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Link href={navItem.href || '#'} passHref legacyBehavior>
                      <ChakraLink
                        p={2}
                        px={3}
                        _hover={{
                          textDecoration: 'none',
                          color: 'brand.500',
                          bg: menuHoverBg,
                        }}
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        transition="all 0.2s"
                      >
                        <HStack spacing={3}>
                          <Icon 
                            as={navItem.icon} 
                            w={5} 
                            h={5}
                            transition="all 0.2s"
                          />
                          <Text fontWeight={500}>{navItem.label}</Text>
                        </HStack>
                      </ChakraLink>
                    </Link>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
} 