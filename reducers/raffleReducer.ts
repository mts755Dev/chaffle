import { RaffleStore } from '@/store/raffleStore';
import { donation_form } from '@prisma/client';
import { Reducer } from 'react';

export type RaffleAction = {
  type: 'set' | 'create' | 'update' | 'delete';
  payload: any;
};

export type RaffleReducer = Reducer<RaffleStore, RaffleAction>;

export const raffleReducer: RaffleReducer = (state, action) => {
  switch (action.type) {
    case 'delete':
      state = {
        ...state,
        forms: state.forms.filter((form) => form.id !== action.payload),
      };
      return state;

    case 'set':
      state = { ...state, forms: action.payload };
      return state;

    case 'create':
      state = { ...state, forms: [...state.forms, action.payload] };
      return state;

    case 'update':
      const updatedRaffles = state.forms.reduce(
        (prev: donation_form[], curr: donation_form) => {
          if (!curr.id === action.payload.id) return [...prev, curr];
          return [...prev, { ...curr, ...action.payload }];
        },
        []
      );
      state = { ...state, forms: updatedRaffles };
      return state;

    default:
      return state;
  }
};
