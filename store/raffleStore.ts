import { donation_form } from '@prisma/client';

export type RaffleStore = {
  forms: donation_form[];
};

export const raffleStore: RaffleStore = {
  forms: [],
};
