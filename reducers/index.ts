import { Reducer } from 'react';
import { raffleReducer } from './raffleReducer';
import { GlobalStore } from '@/store';
import { userReducer } from './userReducer';

export type GlobalAction = {
  type: 'set' | 'create' | 'update' | 'delete';
  payload: any;
  reducer: 'raffles' | 'user';
};

export type GlobalReducer = Reducer<GlobalStore, GlobalAction>;

export const globalReducer: GlobalReducer = (
  state,
  { type, reducer, payload }
) => {
  switch (reducer) {
    case 'raffles':
      return {
        ...state,
        raffles: raffleReducer(state.raffles, {
          payload,
          type,
        }),
      };
    case 'user':
      return {
        ...state,
        user: userReducer(state.user, {
          payload,
          type,
        }),
      };
    default:
      // eslint-disable-next-line no-unused-vars
      return state;
  }
};
