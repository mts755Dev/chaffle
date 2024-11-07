import { UserStore } from '@/store/userStore';
import { Reducer } from 'react';

export type UserAction = {
  type: 'set' | 'create' | 'update' | 'delete';
  payload: any;
};

export type UserReducer = Reducer<UserStore, UserAction>;

export const userReducer: UserReducer = (state, action) => {
  switch (action.type) {
    case 'delete':
      return state;

    case 'set':
      state = action.payload;
      return state;

    case 'create':
      return state;

    case 'update':
      return state;

    default:
      return state;
  }
};
