'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';

type Props = {
  buttonText: string;
  authForm: React.ReactNode;
};

export const AuthDialog = ({ buttonText, authForm }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">{authForm}</DialogContent>
    </Dialog>
  );
};
