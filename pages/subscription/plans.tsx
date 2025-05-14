import { useState } from 'react';
import {
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Switch,
  FormControl,
  FormLabel,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Divider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { SUBSCRIPTION_PLANS } from '@/config/subscription-plans';
import { PlanCard } from '@/components/subscription/PlanCard';
import { useSubscription } from '@/hooks/useSubscription';
import { FaCheck, FaTimes } from 'react-icons/fa';

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne la période d'essai ?",
    answer: "Vous bénéficiez de 7 jours d'essai gratuit sur les plans Pro et Pro+. Pendant cette période, vous avez accès à toutes les fonctionnalités du plan choisi. Vous pouvez annuler à tout moment sans être facturé."
  },
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. La différence de prix sera calculée au prorata de votre utilisation."
  },
  {
    question: "Comment sont gérés les comptes enfants ?",
    answer: "Chaque plan permet de créer un nombre spécifique de comptes enfants. Le plan Gratuit permet 1 compte, le plan Pro permet 3 comptes, et le plan Pro+ offre un nombre illimité de comptes."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les cartes de crédit principales (Visa, Mastercard, American Express) ainsi que les prélèvements SEPA pour les paiements récurrents."
  },
  {
    question: "Comment annuler mon abonnement ?",
    answer: "Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. L'accès aux fonctionnalités premium reste actif jusqu'à la fin de la période facturée."
  }
];

const COMPARISON_FEATURES = [
  { id: 'games', name: 'Jeux éducatifs', tooltip: 'Nombre de jeux disponibles' },
  { id: 'children', name: 'Comptes enfants', tooltip: 'Nombre de comptes enfants autorisés' },
  { id: 'progress', name: 'Suivi des progrès', tooltip: 'Niveau de détail du suivi' },
  { id: 'support', name: 'Support', tooltip: 'Type de support disponible' },
  { id: 'ads', name: 'Publicités', tooltip: 'Présence de publicités' },
  { id: 'content', name: 'Contenu exclusif', tooltip: 'Accès au contenu premium' },
  { id: 'api', name: 'API', tooltip: 'Accès aux API pour intégration' },
  { id: 'reports', name: 'Rapports', tooltip: 'Rapports détaillés et analyses' },
];

export default function SubscriptionPlans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { subscribe, isLoading } = useSubscription();
  const toast = useToast();
  const bgBox = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const neonGreen = '#39FF14';
  const neonGreenDark = '#2EE000';

  const handleSubscribe = async (plan: typeof SUBSCRIPTION_PLANS[0]) => {
    try {
      await subscribe(plan.priceId);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la souscription. Veuillez réessayer.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getFeatureValue = (planId: string, featureId: string) => {
    switch (featureId) {
      case 'games':
        return planId === 'FREE' ? 'Basique' : planId === 'PRO' ? 'Tous' : 'Tous + Exclusifs';
      case 'children':
        return planId === 'FREE' ? '1' : planId === 'PRO' ? '3' : 'Illimité';
      case 'progress':
        return planId === 'FREE' ? 'Basique' : planId === 'PRO' ? 'Avancé' : 'Détaillé';
      case 'support':
        return planId === 'FREE' ? 'Communautaire' : planId === 'PRO' ? 'Prioritaire' : 'Dédié';
      case 'ads':
        return planId === 'FREE' ? <Icon as={FaTimes} color="red.500" /> : <Icon as={FaCheck} color="green.500" />;
      case 'content':
        return planId === 'FREE' ? <Icon as={FaTimes} color="red.500" /> : <Icon as={FaCheck} color="green.500" />;
      case 'api':
        return planId === 'PRO_PLUS' ? <Icon as={FaCheck} color="green.500" /> : <Icon as={FaTimes} color="red.500" />;
      case 'reports':
        return planId === 'FREE' ? 'Basique' : planId === 'PRO' ? 'Avancé' : 'Complet';
      default:
        return '-';
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center" mb={10}>
        <Badge colorScheme="green" p={2} borderRadius="full" fontSize="md" bg={neonGreen} color="black">
          2 mois gratuits avec l'abonnement annuel
        </Badge>
        
        <Heading as="h1" size="2xl" textAlign="center">
          Choisissez votre plan
        </Heading>
        
        <Text fontSize="xl" color="gray.500" textAlign="center" maxW="2xl">
          Sélectionnez le plan qui correspond le mieux à vos besoins. Tous les plans incluent une période d'essai gratuite.
        </Text>
        
        <FormControl display="flex" alignItems="center" justifyContent="center">
          <FormLabel htmlFor="annual-billing" mb="0">
            Facturation mensuelle
          </FormLabel>
          <Switch
            id="annual-billing"
            isChecked={isAnnual}
            onChange={(e) => setIsAnnual(e.target.checked)}
            colorScheme="green"
          />
          <FormLabel htmlFor="annual-billing" mb="0" ml={2}>
            Facturation annuelle
          </FormLabel>
        </FormControl>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} alignItems="flex-start">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isAnnual={isAnnual}
            onSubscribe={handleSubscribe}
            isLoading={isLoading}
            colorScheme="green"
          />
        ))}
      </SimpleGrid>

      <Divider my={16} />

      <VStack spacing={8} align="stretch">
        <Heading as="h2" size="xl" textAlign="center">
          Comparaison détaillée des plans
        </Heading>

        <Box overflowX="auto">
          <Table variant="simple" borderWidth="1px" borderColor={borderColor}>
            <Thead bg={bgBox}>
              <Tr>
                <Th>Fonctionnalité</Th>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <Th key={plan.id} textAlign="center">
                    {plan.name}
                    {plan.isPopular && (
                      <Badge colorScheme="green" ml={2} bg={neonGreen} color="black">
                        Populaire
                      </Badge>
                    )}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {COMPARISON_FEATURES.map((feature) => (
                <Tr key={feature.id}>
                  <Td fontWeight="medium">{feature.name}</Td>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <Td key={`${plan.id}-${feature.id}`} textAlign="center">
                      {getFeatureValue(plan.id, feature.id)}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      <Divider my={16} />

      <VStack spacing={8} align="stretch">
        <Heading as="h2" size="xl" textAlign="center">
          Questions fréquentes
        </Heading>

        <Accordion allowMultiple>
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} borderColor="gray.100">
              <h3>
                <AccordionButton 
                  py={4} 
                  _hover={{ 
                    bg: `${neonGreen}20`,
                    fontWeight: 'bold'
                  }}
                >
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    {item.question}
                  </Box>
                  <AccordionIcon color="gray.400" />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                {item.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Container>
  );
} 