'use client';

import CharityId from '@/components/forms/charityId';
import AnimatedCounter from '@/components/shared/animatedCounter';
import React from 'react';

export const HomeActions = () => {
  return (
    <div
      id="donate-now"
      className="flex flex-col space-y-20 bg-primary px-10 py-20"
    >
      <div className="text-primary-foreground flex flex-col lg:flex-row items-center space-y-5 lg:space-y-0 lg:space-x-5 justify-center">
        <CharityId />
      </div>

      <div className="grid mx-auto sm:gap-16 grid-cols-2">
        <AnimatedCounter
          animatedNumber={455000}
          prefix="$"
          subTitle="Total money raised for charities"
          color="white"
          subTitleColor="rgb(255 255 255 / 0.65)"
        />

        <AnimatedCounter
          animatedNumber={389999}
          prefix="$"
          subTitle="Total money paid to winners"
          color="white"
          subTitleColor="rgb(255 255 255 / 0.65)"
        />
      </div>
    </div>
  );
};
