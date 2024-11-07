import stripe from 'stripe';

const client = new stripe(process.env.STRIPE_KEY!, {
  typescript: true,
});

export default client;
