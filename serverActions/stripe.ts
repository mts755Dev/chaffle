'use server';

import client from '@/stripe/client';

export const createStripeAccount = async (donationId: string) => {
  const account = await client.accounts.create({
    metadata: {
      donationId,
    },
    email: "pookiechaffle9988@mailinator.com",
    controller: {
      losses: {
        payments: 'stripe',
      },
      fees: {
        payer: 'account',
      },
      stripe_dashboard: {
        type: 'full',
      },
    },
  });

  return { ...account };
};

export const createStripeAccountLink = async (clientId: string) => {
  const accountLink = await client.accountLinks.create({
    account: clientId,
    refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/account/${clientId}/verify`,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/account/${clientId}/verify`,
    type: 'account_onboarding',
  });

  return { ...accountLink };
};

export const retrieveAccountDetails = async (clientId: string) => {
  const account = await client.accounts.retrieve(clientId);
  return { ...account };
};

export const createCheckoutSession = async ({
  isApplicationAmount,
  quantity,
  raffleAccount,
  amount,
  email,
  ticketId,
}: {
  isApplicationAmount?: boolean;
  quantity: number;
  raffleAccount: string;
  amount: number;
  email: string;
  ticketId: string;
}) => {
  const session = await client.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'USD',
          product_data: {
            name: 'Raffle Ticket',
          },
          unit_amount:
            (amount + (isApplicationAmount ? 0.1 * quantity * amount : 0)) *
            100,
        },
        quantity,
      },
    ],
    customer_email: email,
    payment_intent_data: {
      application_fee_amount:
        (isApplicationAmount ? 0.1 * quantity * amount : 0) * 100,
      // transfer_data: {
      //   destination: raffleAccount,
      // },
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/payment/${ticketId}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  }, { stripeAccount: raffleAccount });

  return { ...session };
};

export const retrievePayments = async () => {
  const paymentsList = await client.paymentIntents.list({
    limit: 1,
  });

  const customersList = await client.customers.list({
    limit: 1,
  });

  return { paymentsList, customersList };
};
