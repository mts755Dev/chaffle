'use client';

import { assets } from '@/constants/assets';
import Image from 'next/image';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { HomeActions } from './components/homeActions';
import ContactSupport from '@/components/shared/contactSupport';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';

const organizations = [assets.partener];

export const Home = () => {
  return (
    <div className="w-full lg:pt-20 flex flex-col space-y-10">
      <div className="flex flex-col space-x-0 lg:space-x-20 lg:flex-row lg:space-y-0 items-center justify-center">
        <div className="text-2xl pb-12 lg:text-5xl px-4 lg:px-2 text-primary uppercase leading-normal">
          <h3 className="text-2xl text-center text-primary">
            Chaffle, a Charity Raffle Organization
          </h3>
        </div>
        <Image
          src={assets.homePNG.url}
          alt={assets.homePNG.alt}
          width={500}
          height={500}
          className="w-96 h-auto"
        />
      </div>

      <HomeActions />

      <div
        id="about-us"
        className="text-center lg:text-xl font-semibold flex flex-col space-y-20 lg:space-y-10 py-16 text-primary"
      >
        <h2 className="underline underline-offset-4 text-2xl lg:text-3xl">
          Mission
        </h2>
        <p className="px-10 xl:px-32 text-justify">
          Our Mission is to harness the power of cutting-edge technology to
          connect charities and nonprofits with untapped markets via creative,
          engaging, and easy to use online 50/50 raffles that maximize
          fundraising potential.
        </p>

        <h2 className="underline underline-offset-4 text-2xl lg:text-3xl">
          Our Vision
        </h2>
        <p className="px-10 xl:px-32 text-justify">
          Our Vision is to revolutionize the way that charities and non-profits
          fundraise by pioneering innovative 50/50 raffle strategies.
        </p>
        <div>
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="-ml-1 flex items-center justify-center">
              {organizations.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="border-0">
                      <CardContent className="border-0 flex aspect-square items-center justify-center p-6">
                        <Image
                          width={500}
                          height={500}
                          alt={item.alt}
                          src={item.url}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* <div className="text-center lg:text-xl font-semibold flex flex-col items-center space-y-20 lg:space-y-10 py-16 text-primary">
        <h2 className="underline underline-offset-4 text-2xl lg:text-3xl">
          FAQ (Frequently Asked Questions)
        </h2>

        <Accordion type="single" collapsible className="w-1/2">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a 50/50?</AccordionTrigger>
            <AccordionContent>Explanation not yet provided</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Really show how the money is going to charity AND pot and how
              everyone wins
            </AccordionTrigger>
            <AccordionContent>Not Provided</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div> */}

      <div
        id="support-form"
        className="flex flex-col space-y-5 lg:flex-row lg:space-y-0 items-center justify-between pt-0 lg:pt-10 p-10"
      >
        <Image
          width={500}
          height={500}
          className="w-[640] h-[640]"
          alt={assets.contactSVG.alt}
          src={assets.contactSVG.url}
        />

        <ContactSupport />
      </div>
    </div>
  );
};
