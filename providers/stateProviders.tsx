'use client';

import { GlobalAction, globalReducer } from '@/reducers';
import { GlobalStore, store } from '@/store';
import { createContext, useReducer, useContext, Dispatch } from 'react';

type StateContextType = {
  state: GlobalStore;
  dispatch: Dispatch<GlobalAction>;
};

const StateContext = createContext<StateContextType>({
  state: {
    raffles: {
      forms: [],
    },
    user: null,
  },
  dispatch: () => {},
});

export const StateProvider = ({ children }: ReactChildren) => {
  const [state, dispatch] = useReducer(globalReducer, store);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
