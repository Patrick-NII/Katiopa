import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Subscription {
  plan: 'free' | 'pro' | 'pro-plus';
  features: string[];
}

interface SubscriptionState {
  isLoading: boolean;
  error: string | null;
  subscription: Subscription | null;
}

export function useSubscription() {
  const { data: session } = useSession();
  const [state, setState] = useState<SubscriptionState>({
    isLoading: false,
    error: null,
    subscription: {
      plan: 'pro',
      features: ['okapi', 'memory', 'suggestions']
    },
  });

  // Pendant le développement, on donne accès à tout le monde
  useEffect(() => {
    setState(prev => ({
      ...prev,
      subscription: {
        plan: 'pro',
        features: ['okapi', 'memory', 'suggestions']
      },
      isLoading: false
    }));
  }, []);

  const subscribe = async (priceId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session de paiement');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Une erreur est survenue',
        isLoading: false,
      }));
    }
  };

  const getSubscription = async () => {
    // Pendant le développement, on retourne toujours un abonnement pro
    setState(prev => ({
      ...prev,
      subscription: {
        plan: 'pro',
        features: ['okapi', 'memory', 'suggestions']
      },
      isLoading: false
    }));
  };

  return {
    subscribe,
    isLoading: state.isLoading,
    error: state.error,
    subscription: state.subscription,
    getSubscription,
  };
} 