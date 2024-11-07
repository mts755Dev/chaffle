'use client';

import { useStateProvider } from '@/providers';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = ReactChildren & {
  user: User | null;
};
// Todo: Auth needs to be implemented on home layout too or write some function that will check for user session
export const Auth = ({ children, user }: Props) => {
  const { dispatch } = useStateProvider();

  useEffect(() => {
    dispatch({
      type: 'set',
      payload: user,
      reducer: 'user',
    });

    if (!user) redirect('/');
  }, [user, dispatch]);

  return <>{children}</>;
};
