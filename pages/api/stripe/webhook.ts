import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('Erreur de signature webhook:', err);
    return res.status(400).json({ message: 'Webhook signature verification failed' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, planId } = session.metadata!;

        // Mettre à jour la souscription
        await prisma.subscription.upsert({
          where: { userId },
          update: {
            planId,
            isActive: true,
            stripeSubscriptionId: session.subscription as string,
            stripePriceId: session.metadata?.priceId,
            stripeCurrentPeriodEnd: new Date((session.subscription as any).current_period_end * 1000),
          },
          create: {
            userId,
            planId,
            isActive: true,
            stripeSubscriptionId: session.subscription as string,
            stripePriceId: session.metadata?.priceId,
            stripeCurrentPeriodEnd: new Date((session.subscription as any).current_period_end * 1000),
          },
        });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const { userId, planId } = subscription.metadata;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            planId,
            isActive: subscription.status === 'active',
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const { userId } = subscription.metadata;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            isActive: false,
            endDate: new Date(),
          },
        });
        break;
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erreur lors du traitement du webhook:', error);
    return res.status(500).json({ message: 'Webhook handler failed' });
  }
} 