export type PlanTier = 'FREE' | 'PRO' | 'PRO_PLUS';

export interface SubscriptionPlan {
  id: PlanTier;
  name: string;
  description: string;
  priceMonthly: number;
  priceId: string;
  productId: string;
  features: string[];
  maxChildAccounts: number;
  isPopular?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'FREE',
    name: 'Gratuit',
    description: 'Pour commencer avec les fonctionnalités essentielles',
    priceMonthly: 0,
    priceId: process.env.STRIPE_FREE_PRICE_ID || 'price_1RDC5AR19YRJdTbBTYaagiwf',
    productId: 'prod_S7Qxy5mQL6YWuQ',
    features: [
      'Accès aux jeux de base',
      '1 compte enfant',
      'Suivi des progrès basique',
      'Support communautaire',
    ],
    maxChildAccounts: 1,
  },
  {
    id: 'PRO',
    name: 'Pro',
    description: 'Pour les familles qui veulent plus de fonctionnalités',
    priceMonthly: 19.90,
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_1RDBytR19YRJdTbBuP6nXCB4',
    productId: 'prod_S7Qqm9j9FPExmp',
    features: [
      'Tous les jeux éducatifs',
      '3 comptes enfants',
      'Suivi des progrès avancé',
      'Support prioritaire',
      'Pas de publicités',
      'Contenu exclusif',
    ],
    maxChildAccounts: 3,
    isPopular: true,
  },
  {
    id: 'PRO_PLUS',
    name: 'Pro+',
    description: 'Pour les grandes familles et les écoles',
    priceMonthly: 49.90,
    priceId: process.env.STRIPE_PRO_PLUS_PRICE_ID || 'price_1RDC4AR19YRJdTbB9IRHEiWI',
    productId: 'prod_S7QwPIifWTzlSQ',
    features: [
      'Tous les avantages Pro',
      'Comptes enfants illimités',
      'Support dédié',
      'Rapports détaillés',
      'API d\'intégration',
      'Formation personnalisée',
    ],
    maxChildAccounts: Infinity,
  },
];

export const getPlanById = (planId: PlanTier): SubscriptionPlan => {
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  if (!plan) throw new Error(`Plan ${planId} not found`);
  return plan;
};

export const getPlanByPriceId = (priceId: string): SubscriptionPlan => {
  const plan = SUBSCRIPTION_PLANS.find(p => p.priceId === priceId);
  if (!plan) throw new Error(`Plan with price ID ${priceId} not found`);
  return plan;
};

export const featureLabels: Record<string, string> = {
  'basic_access': 'Accès aux jeux de base',
  'one_child': '1 compte enfant',
  'basic_progress': 'Suivi des progrès basique',
  'community_support': 'Support communautaire',
  'all_games': 'Tous les jeux éducatifs',
  'three_children': '3 comptes enfants',
  'advanced_progress': 'Suivi des progrès avancé',
  'priority_support': 'Support prioritaire',
  'no_ads': 'Pas de publicités',
  'exclusive_content': 'Contenu exclusif',
  'unlimited_children': 'Comptes enfants illimités',
  'dedicated_support': 'Support dédié',
  'detailed_reports': 'Rapports détaillés',
  'api_access': 'API d\'intégration',
  'custom_training': 'Formation personnalisée',
}; 