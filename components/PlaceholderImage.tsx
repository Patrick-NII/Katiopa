import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

interface PlaceholderImageProps {
  width: string | number;
  height: string | number;
  text?: string;
  borderRadius?: string;
}

export function PlaceholderImage({
  width,
  height,
  text = 'Image',
  borderRadius = 'xl',
}: PlaceholderImageProps) {
  const bgGradient = useColorModeValue(
    'linear(to-r, brand.100, secondary.100, accent.100)',
    'linear(to-r, brand.900, secondary.900, accent.900)'
  );

  return (
    <Box
      w={width}
      h={height}
      borderRadius={borderRadius}
      overflow="hidden"
      position="relative"
      bgGradient={bgGradient}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        animation: `${shimmer} 2s infinite linear`,
      }}
    >
      <Flex
        w="full"
        h="full"
        align="center"
        justify="center"
        color="white"
        fontWeight="bold"
        fontSize="lg"
        textShadow="0 2px 4px rgba(0,0,0,0.2)"
      >
        {text}
      </Flex>
    </Box>
  );
} 