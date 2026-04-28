'use client';

import MainLayout from '@/components/layouts/mainLayout';
import { assets } from '@/constants/assets';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          src={assets.notFound.url}
          alt={assets.notFound.url}
          width={500}
          className="bg-primary bg-blend-hard-light"
          height={500}
        />
        <p className="text-center text-gray-600">
          Having trouble due to location settings?{' '}
          <Link
            href="/troubleshoot"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Check our location troubleshooting guide
          </Link>
        </p>
      </div>
    </MainLayout>
  );
}
