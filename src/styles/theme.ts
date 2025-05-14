import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#F0F9FF',
      100: '#E0F2FE',
      200: '#BAE6FD',
      300: '#7DD3FC',
      400: '#38BDF8',
      500: '#0EA5E9',
      600: '#0284C7',
      700: '#0369A1',
      800: '#075985',
      900: '#0C4A6E',
    },
    secondary: {
      50: '#F5F3FF',
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      500: '#8B5CF6',
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
    },
  },
  fonts: {
    heading: '"Baloo 2", cursive',
    body: '"Baloo 2", cursive',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 'bold',
        fontSize: 'lg',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'scale(1.05)',
          },
          _active: {
            bg: 'brand.700',
          },
        },
        outline: {
          border: '2px solid',
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'brand.700',
        fontWeight: 'bold',
      },
      sizes: {
        '2xl': {
          fontSize: ['4xl', '5xl', '6xl'],
        },
        xl: {
          fontSize: ['3xl', '4xl', '5xl'],
        },
        lg: {
          fontSize: ['2xl', '3xl', '4xl'],
        },
      },
    },
    Text: {
      baseStyle: {
        fontSize: ['lg', 'xl'],
        lineHeight: 'tall',
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'var(--chakra-colors-brand-900)' : 'brand.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        backgroundImage: props.colorMode === 'dark' ? 'linear-gradient(45deg, var(--chakra-colors-brand-900), var(--chakra-colors-secondary-800))' : 'none',
        backgroundSize: '400% 400%',
        animation: props.colorMode === 'dark' ? 'gradient 15s ease infinite' : 'none',
      },
      '@keyframes gradient': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
    }),
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme; 