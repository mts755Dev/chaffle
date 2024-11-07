import { Footer } from '@/components/shared/footer/footer';
import Navbar from '@/components/shared/navbar';
import React from 'react';

export const MainLayout = ({ children }: ReactChildren) => {
  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="primary-layout">{children}</div>
      <Footer />
    </div>
  );
};
