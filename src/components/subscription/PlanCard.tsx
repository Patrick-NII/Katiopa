import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { SubscriptionPlan } from '@/config/subscription-plans';
import { useSubscriptionPrice } from '@/hooks/useSubscriptionPrice';

interface PlanCardProps {
  plan: SubscriptionPlan;
  isAnnual: boolean;
  onSubscribe: (plan: SubscriptionPlan) => Promise<void>;
  isLoading: boolean;
  colorScheme?: string;
}

export function PlanCard({ plan, isAnnual, onSubscribe, isLoading, colorScheme = 'green' }: PlanCardProps) {
  const pricing = useSubscriptionPrice(plan, isAnnual);
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const neonGreen = '#39FF14';
  const shadow = useColorModeValue('0 4px 6px rgba(0, 0, 0, 0.1)', '0 4px 6px rgba(0, 0, 0, 0.3)');

  return (
    <Box
      p={6}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={plan.isPopular ? neonGreen : borderColor}
      bg={bgColor}
      boxShadow={shadow}
      position="relative"
      backdropFilter="blur(10px)"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.2s',
      }}
    >
      {plan.isPopular && (
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme={colorScheme}
          bg={neonGreen}
          color="black"
          px={2}
          py={1}
          borderRadius="full"
          boxShadow="0 0 8px rgba(57, 255, 20, 0.5)"
        >
          Populaire
        </Badge>
      )}
      
      <VStack spacing={4} align="stretch">
        <Text fontFamily="body" fontSize="2xl" fontWeight="bold">
          {plan.name}
        </Text>
        
        <Text fontFamily="body" fontSize="sm" color="gray.500">
          {plan.description}
        </Text>
        
        <Box>
          <Text fontFamily="body" fontSize="3xl" fontWeight="bold">
            {isAnnual ? pricing.annual.monthlyEquivalent : pricing.monthly.formatted}
          </Text>
          {isAnnual && (
            <Text fontFamily="body" fontSize="sm" color="gray.500">
              {pricing.annual.formatted} par an ({pricing.getSavingsText()})
            </Text>
          )}
        </Box>
        
        <List spacing={2}>
          {plan.features.map((feature, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <ListIcon as={FaCheck} color="green.500" />
              <Text fontFamily="body" fontSize="sm">{feature}</Text>
            </ListItem>
          ))}
        </List>
        
        <Button
          colorScheme={colorScheme}
          size="lg"
          onClick={() => onSubscribe(plan)}
          isLoading={isLoading}
          isDisabled={plan.priceMonthly === 0}
          mt={4}
          _hover={{ transform: 'scale(1.05)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          transition="all 0.2s"
          borderRadius="full"
        >
          {plan.priceMonthly === 0 ? 'Commencer gratuitement' : 'Souscrire'}
        </Button>
        
        {plan.maxChildAccounts < Infinity && (
          <Text fontFamily="body" fontSize="xs" color="gray.500" textAlign="center" mt={2}>
            Jusqu'à {plan.maxChildAccounts} compte{plan.maxChildAccounts > 1 ? 's' : ''} enfant
          </Text>
        )}
      </VStack>
    </Box>
  );
} 