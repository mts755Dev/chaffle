import { Footer } from '@/components/shared/footer/footer';
import Navbar from '@/components/shared/navbar';
import React from 'react';

export const RaffleLayout = ({ children }: ReactChildren) => {
  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="primary-layout !pt-0">{children}</div>
      <Footer />
    </div>
  );
};
