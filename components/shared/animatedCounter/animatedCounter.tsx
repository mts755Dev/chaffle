'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
  ssr: false,
});

type Props = {
  color?: string;
  includeComma?: boolean;
  subTitle?: string;
  fontSize?: number;
  subTitleColor?: string;
  prefix?: string;
  animatedNumber: number;
};

export const AnimatedCounter = ({
  color = 'white',
  includeComma = true,
  subTitle,
  subTitleColor,
  fontSize,
  prefix,
  animatedNumber,
}: Props) => {
  return (
    <div className="container">
      <div
        className={`text-2xl md:text-3xl lg:text-6xl flex items-center space-x-1`}
        style={{ color }}
      >
        {prefix && <span>{prefix}</span>}
        <AnimatedNumbers
          includeComma={includeComma}
          transitions={(index) => ({
            type: 'spring',
            duration: index + 0.3,
          })}
          animateToNumber={animatedNumber}
          fontStyle={{
            fontSize,
            color,
          }}
        />
      </div>

      {subTitle && (
        <p
          className="mt-4 text-white/65 font-bold sm:text-lg italic"
          style={{ color: subTitleColor }}
        >
          {subTitle}
        </p>
      )}
    </div>
  );
};
