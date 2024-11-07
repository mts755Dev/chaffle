'use client';

import MainLayout from '@/components/layouts/mainLayout';
import { assets } from '@/constants/assets';
import Image from 'next/image';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center">
        <Image
          src={assets.notFound.url}
          alt={assets.notFound.url}
          width={500}
          className="bg-primary bg-blend-hard-light"
          height={500}
        />
      </div>
    </MainLayout>
  );
}
