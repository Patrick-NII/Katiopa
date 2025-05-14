import { Box, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface StripeBackgroundProps {
  children: ReactNode;
}

const StripeBackground = ({ children }: StripeBackgroundProps) => {
  const bgColor = useColorModeValue('brand.50', 'var(--chakra-colors-brand-900)');
  const waveColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.1)');

  return (
    <Box
      position="relative"
      minH="100vh"
      bg={bgColor}
      overflow="hidden"
    >
      {/* Motif animé (vagues) en CSS, inspiré Stripe, adapté pour une app enfantine */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        zIndex="0"
        sx={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='${encodeURIComponent(waveColor)}' d='M0, 192 L 60, 197 L 120, 202 L 180, 207 L 240, 212 L 300, 207 L 360, 202 L 420, 197 L 480, 192 L 540, 197 L 600, 202 L 660, 207 L 720, 212 L 780, 207 L 840, 202 L 900, 197 L 960, 192 L 1020, 197 L 1080, 202 L 1140, 207 L 1200, 212 L 1260, 207 L 1320, 202 L 1380, 197 L 1440, 192 L 1440, 320 L 0, 320 Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '1440px 320px',
          animation: 'wave 15s linear infinite',
        }}
      />
      {children}
    </Box>
  );
};

export default StripeBackground; 