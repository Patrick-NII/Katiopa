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
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const neonGreen = '#39FF14';

  return (
    <Box
      p={6}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={plan.isPopular ? neonGreen : borderColor}
      bg={bgColor}
      position="relative"
      _hover={{
        transform: 'translateY(-5px)',
        transition: 'transform 0.2s',
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
        >
          Populaire
        </Badge>
      )}
      
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          {plan.name}
        </Text>
        
        <Text fontSize="sm" color="gray.500">
          {plan.description}
        </Text>
        
        <Box>
          <Text fontSize="3xl" fontWeight="bold">
            {isAnnual ? pricing.annual.monthlyEquivalent : pricing.monthly.formatted}
          </Text>
          {isAnnual && (
            <Text fontSize="sm" color="gray.500">
              {pricing.annual.formatted} par an ({pricing.getSavingsText()})
            </Text>
          )}
        </Box>
        
        <List spacing={2}>
          {plan.features.map((feature, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <ListIcon as={FaCheck} color="green.500" />
              <Text fontSize="sm">{feature}</Text>
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
        >
          {plan.priceMonthly === 0 ? 'Commencer gratuitement' : 'Souscrire'}
        </Button>
        
        {plan.maxChildAccounts < Infinity && (
          <Text fontSize="xs" color="gray.500" textAlign="center" mt={2}>
            Jusqu'à {plan.maxChildAccounts} compte{plan.maxChildAccounts > 1 ? 's' : ''} enfant
          </Text>
        )}
      </VStack>
    </Box>
  );
} 