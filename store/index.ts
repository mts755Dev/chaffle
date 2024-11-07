import { RaffleStore, raffleStore } from './raffleStore';
import { UserStore, userStore } from './userStore';

export type GlobalStore = {
  raffles: RaffleStore;
  user: UserStore;
};

export const store: GlobalStore = {
  raffles: raffleStore,
  user: userStore,
};
