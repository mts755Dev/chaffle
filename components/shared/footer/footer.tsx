import { assets } from '@/constants/assets';
import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <div className="bg-primary min-h-96 rounded-tl-[10rem] md:rounded-tl-[15rem] flex flex-col space-y-10 justify-between p-10 items-center">
      <Link href="/">
        <Image
          width={500}
          height={500}
          className="w-48 sm:w-56 lg:w-72 h-auto"
          src={assets.chaffleSVG.url}
          alt={assets.chaffleSVG.alt}
        />
      </Link>
      <div className="font-medium font-serif">50/50 CHARITY RAFFLES</div>
      <div className="flex space-x-5 items-center">
        <Link href="https://www.facebook.com/share/cdeGLQd9WS1TajT1/?mibextid=LQQJ4d">
          <Facebook className="w-10 cursor-pointer h-10" strokeWidth={'1.25'} />
        </Link>
        <Link href="https://www.instagram.com/chafflefundraising?igsh=ZTJudjZnenZtdDA0">
          <Instagram
            className="w-10 cursor-pointer h-10"
            strokeWidth={'1.25'}
          />
        </Link>
        <Link href="https://x.com/chafflellc?s=11&t=wmbk6WQMTaImuIdR06ZqEg">
          <Image
            src={assets.twitterIcon.url}
            className="w-10 h-10 cursor-pointer"
            width={10}
            height={10}
            alt={assets.twitterIcon.alt}
          />
        </Link>
      </div>
      <Image
        src={assets.flag.url}
        alt={assets.flag.alt}
        width={100}
        height={100}
        className="w-12 h-auto"
      />
      <p className="text-white">
        All rights reserved. Chaffle LLC registered in 2024
      </p>
    </div>
  );
};
