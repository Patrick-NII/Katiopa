import { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Tooltip, Image, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatWindow } from './ChatWindow';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(147, 51, 234, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
`;

// Créer les composants motion une seule fois en dehors du composant
const MotionBox = motion(Box);

export const OkapiFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [showBounce, setShowBounce] = useState(true);

  // Couleurs adaptatives
  const buttonBg = useColorModeValue('white', 'gray.800');
  const shadowColor = useColorModeValue('rgba(147, 51, 234, 0.3)', 'rgba(147, 51, 234, 0.5)');

  // Afficher le bouton après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Effet pour alterner entre les animations
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setShowPulse(prev => !prev);
    }, 10000); // Alterne toutes les 10 secondes

    return () => clearInterval(pulseInterval);
  }, []);

  // Désactive le bounce quand la souris est dessus
  useEffect(() => {
    if (isHovered) {
      setShowBounce(false);
    } else {
      const timer = setTimeout(() => setShowBounce(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <MotionBox
            position="fixed"
            bottom="2rem"
            right="2rem"
            zIndex={1000}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: showBounce ? [0, -10, 0] : 0
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.5,
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            onClick={onOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            cursor="pointer"
          >
            <Tooltip
              label="Cliquez pour discuter avec Okapi"
              placement="left"
              hasArrow
            >
              <Box
                position="relative"
                width="60px"
                height="60px"
                borderRadius="full"
                bg={buttonBg}
                boxShadow={`0 4px 12px ${shadowColor}`}
                transition="all 0.3s ease"
                animation={showPulse ? `${pulse} 2s infinite` : undefined}
                _hover={{
                  transform: "scale(1.1)",
                  boxShadow: `0 8px 20px ${shadowColor}`,
                }}
              >
                <Image
                  src="/katiopa/okapi-avatar.png"
                  alt="Okapi"
                  width="100%"
                  height="100%"
                  borderRadius="full"
                  objectFit="cover"
                  transition="all 0.3s ease"
                />
                {/* Indicateur de notification */}
                <Box
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  width="12px"
                  height="12px"
                  borderRadius="full"
                  bg="green.400"
                  border="2px solid white"
                  animation={`${pulse} 2s infinite`}
                />
              </Box>
            </Tooltip>
          </MotionBox>
        )}
      </AnimatePresence>

      <ChatWindow isOpen={isOpen} onClose={onClose} />
    </>
  );
}; 