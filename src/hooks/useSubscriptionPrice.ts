import { useMemo } from 'react';
import { SubscriptionPlan } from '@/config/subscription-plans';

export const useSubscriptionPrice = (plan: SubscriptionPlan, isAnnual: boolean = false) => {
  const price = useMemo(() => {
    const monthlyPrice = plan.priceMonthly;
    const annualPrice = monthlyPrice * 10; // 2 mois gratuits pour l'abonnement annuel
    return {
      monthly: {
        amount: monthlyPrice,
        formatted: monthlyPrice === 0 ? 'Gratuit' : `${monthlyPrice.toFixed(2)}€`,
      },
      annual: {
        amount: annualPrice,
        formatted: annualPrice === 0 ? 'Gratuit' : `${annualPrice.toFixed(2)}€`,
        monthlyEquivalent: annualPrice === 0 ? 'Gratuit' : `${(annualPrice / 12).toFixed(2)}€`,
        savings: monthlyPrice * 2, // Économie de 2 mois
      },
      selected: isAnnual ? annualPrice : monthlyPrice,
      period: isAnnual ? 'an' : 'mois',
      isAnnual,
    };
  }, [plan.priceMonthly, isAnnual]);

  const formatPrice = (amount: number) => {
    return amount === 0 ? 'Gratuit' : `${amount.toFixed(2)}€`;
  };

  const getSavingsText = () => {
    if (plan.priceMonthly === 0) return '';
    const savings = price.annual.savings;
    return `Économisez ${formatPrice(savings)} par an`;
  };

  return {
    ...price,
    formatPrice,
    getSavingsText,
  };
}; 