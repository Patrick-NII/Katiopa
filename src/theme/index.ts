import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'md',
    },
    variants: {
      ghost: {
        _hover: {
          bg: 'brand.50',
          color: 'brand.600',
        },
      },
      outline: {
        borderColor: 'brand.200',
        _hover: {
          bg: 'brand.50',
          borderColor: 'brand.300',
        },
      },
    },
  },
  Input: {
    variants: {
      flushed: {
        field: {
          borderColor: 'gray.200',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: 'none',
          },
        },
      },
    },
  },
  Select: {
    variants: {
      unstyled: {
        field: {
          bg: 'transparent',
          _focus: {
            outline: 'none',
          },
        },
      },
    },
  },
  Switch: {
    baseStyle: {
      track: {
        _checked: {
          bg: 'brand.500',
        },
      },
    },
  },
  Badge: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'full',
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  components,
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.700',
      },
    },
  },
});

export default theme; 