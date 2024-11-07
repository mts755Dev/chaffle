'use client';

// import SupabaseImage from '@/components/shared/supabaseImage';
import { Input } from '@/components/ui/input';
// import supabaseLoader from '@/supabase/image-loader';
import { Prisma, donation_form, ticket } from '@prisma/client';
import Link from 'next/link';
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import PaymentDialog from './components/paymentDialog';
import { Button } from '@/components/ui/button';
import { CopyIcon, SendIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useQRCode } from 'next-qrcode';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { assets } from '@/constants/assets';
import Image from 'next/image';
import SupabaseImage from '@/components/shared/supabaseImage';

type Props = {
  donationData: donation_form;
  ticketTotal: Prisma.PickEnumerable<
    Prisma.TicketGroupByOutputType,
    'donation_formId'
  > & {
    _sum: {
      quantity: number | null;
      amount: number | null;
    };
  };
  winnerTicket: ticket | null;
};

// Todo: Add 2 new properties to schema winner estimated prize, total prize
// Todo: Update them in the db as well

export const Donation = ({
  donationData,
  ticketTotal,
  winnerTicket,
}: Props) => {
  const [agreementCheck, setagreementCheck] = useState(false);
  const { Canvas } = useQRCode();

  const collectedPrice = ticketTotal?._sum?.amount ?? 0;
  return (
    <div className="flex relative flex-col space-y-10 px-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed z-20 bg-orange-400 right-5 bottom-5 rounded-full">
            <SendIcon /> <span>Share</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Share with your friends</DialogHeader>
          <div className="w-full flex flex-col space-y-5 items-center justify-center">
            <section>
              <Canvas
                text={`${process.env.NEXT_PUBLIC_BASE_URL}/donation/${donationData.id}`}
                options={{
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: '#000',
                    light: '#FFF',
                  },
                }}
              />
            </section>
            <Separator />
            <section className="flex items-center justify-center">
              <Link
                className="text-xs"
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/donation/${donationData.id}`}
              >
                {`${process.env.NEXT_PUBLIC_BASE_URL}/donation/${donationData.id}`}
              </Link>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/donation/${donationData.id}`
                  );
                  toast({
                    title: 'Link copied',
                  });
                }}
              >
                <CopyIcon />
              </Button>
            </section>
          </div>
        </DialogContent>
      </Dialog>
      {/* <section>
        <div
          style={{
            backgroundImage: `url(${supabaseLoader({ src: donationData.backgroundImage!, width: 100, quality: 75 })})`,
          }}
          className="w-full min-h-96 bg-cover bg-center bg-no-repeat bg-blend-soft-light bg-primary"
        />

        <div className="flex flex-col lg:flex-row justify-between w-full h-full bg-primary p-2 text-white space-y-2 lg:space-y-0 lg:space-x-2">
          <div className="flex flex-col text-lg font-mono lg:w-1/2 p-4 rounded-md shadow-md drop-shadow-md h-full text-center bg-teal-800">
            <p className="text-2xl font-semibold">{donationData.title}</p>

            <p className="pt-4 text-base">Draw Date</p>

            <p className="text-2xl">
              {new Date(donationData.draw_date!).toDateString()}
            </p>

            <p className="pt-4 text-base">Raffle Location</p>

            <p className="text-2xl">{donationData?.raffleLocation}</p>

            <p className="pt-4 text-base">Current Jackpot</p>

            <p className="text-2xl">${collectedPrice}</p>

            <p className="pt-4 text-base">Estimated Prize</p>

            <p className="text-2xl">${collectedPrice / 2}</p>
          </div>
          <div className="flex flex-col text-xl justify-center space-y-5 font-mono lg:w-1/2 p-4 rounded-md shadow-md drop-shadow-md h-full text-center bg-teal-800">
            {new Date(donationData.draw_date!) < new Date() && winnerTicket ? (
              <>
                <p className="pt-4 text-base">Raffle has ended</p>
                <p className="pt-4 text-base">
                  The winner is with ticket #{' '}
                  <span className="font-semibold">{winnerTicket.id}</span>
                </p>

                <p className="pt-4 text-base">
                  Winner will be contact thorugh thier phone or email
                </p>
              </>
            ) : (
              <>
                <p className="pt-4 text-base">Hurry! Time Left:</p>

                <p className="text-2xl">
                  <Countdown
                    date={new Date(donationData.draw_date!).getTime()}
                  />
                </p>
              </>
            )}

            <div>
              <p className="pt-4 text-base">Minimum Ticket Price</p>

              <p className="text-2xl">${donationData.min_ticket_price ?? 5}</p>
            </div>

            {!winnerTicket &&
              (agreementCheck && (donationData.stripeAccount as any)?.id ? (
                <PaymentDialog
                  raffleAccount={(donationData.stripeAccount as any)?.id}
                  raffleId={donationData.id}
                  disabled={!agreementCheck}
                />
              ) : (
                <p>Accept the terms below to buy the tickets</p>
              ))}
          </div>
        </div>
      </section> */}

      <section>
        {/* Hero image */}
        <div className="flex  items-center justify-center space-x-2  md:space-x-8 md:-ml-16">
          {donationData?.backgroundImage && (
            <SupabaseImage
              src={donationData?.backgroundImage!}
              className="w-[150px] lg:w-[350px] h-auto object-center"
              width={500}
              height={500}
              alt="charity"
            />
          )}
          <Image
            src={assets.momentsSVG.url}
            alt={assets.momentsSVG.alt}
            className="w-[150px] lg:w-[350px] h-auto lg:h-[350px] object-center"
            width={500}
            height={500}
          />
        </div>
        {/* ticket information */}

        <div className="my-5">
          <h1 className="font-serif uppercase font-semibold text-center -mr-10 text-xl">
            50/50 RAFFLE
          </h1>
        </div>

        <div className="my-14 grid grid-cols-1 lg:flex lg:items-center lg:justify-center">
          <div className="flex relative  items-center justify-center">
            <Image
              src={assets.ticketSvg.url}
              alt={assets.ticketSvg.alt}
              className="w-full h-full "
              width={500}
              height={500}
            />
            <div className="-mt-3 text-sm font-serif font-semibold leading-none absolute bg-transparent w-[220px] h-[220px]  flex flex-col items-center justify-center">
              <span>Raffle Location</span>
              <span className="">{donationData.raffleLocation}</span>
              <span>Draw Date</span>
              <span className="">
                {new Date(
                  donationData?.draw_date ?? Date.now()
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex relative  items-center justify-center">
            <Image
              src={assets.ticketSvg.url}
              alt={assets.ticketSvg.alt}
              className="w-full h-full "
              width={500}
              height={500}
            />
            <div className="-mt-4 text-sm font-serif font-semibold absolute bg-transparent w-[220px] h-[220px]  flex flex-col items-center justify-center">
              <span className="text-2xl">${collectedPrice}</span>
              <span>POT</span>
            </div>
          </div>

          <div className="flex relative  items-center justify-center">
            <Image
              src={assets.ticketSvg.url}
              alt={assets.ticketSvg.alt}
              className="w-full h-full "
              width={500}
              height={500}
            />
            <div className="-mt-4 text-sm font-serif font-semibold absolute bg-transparent w-[220px] h-[220px]  flex flex-col items-center justify-center">
              <span className="text-2xl">${collectedPrice / 2}</span>
              <span>Estimated Winning</span>
            </div>
          </div>
          <div className="flex relative  items-center justify-center">
            <Image
              src={assets.ticketSvg.url}
              alt={assets.ticketSvg.alt}
              className="w-full h-full "
              width={500}
              height={500}
            />
            <div className="-mt-4 text-xs font-serif font-semibold absolute bg-transparent w-[220px] h-[220px]  flex flex-col items-center justify-center">
              {!winnerTicket ? (
                <>
                  <span>Hurry there&apos;s still time</span>
                  <span className="text-lg">
                    <Countdown
                      date={new Date(donationData.draw_date!).getTime()}
                    />
                  </span>
                  <span>Time until raffle</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-center">
                    #{winnerTicket.id}
                  </span>
                  <span>Winner Ticket</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* purchase section */}
        <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row items-center justify-center w-full lg:space-x-10">
          {!winnerTicket && (
            <div>
              <PaymentDialog
                raffleAccount={(donationData.stripeAccount as any)?.id}
                raffleId={donationData.id}
                disabled={!agreementCheck}
                iconButton={true}
              />
              <>
                <div className="mt-4 text-sm font-semibold flex justify-center items-center space-x-2">
                  <Input
                    type="checkbox"
                    onChange={() => setagreementCheck(!agreementCheck)}
                    className="w-3 h-3"
                  />
                  <span className="font-mono">
                    I accept the terms and conditions
                  </span>
                </div>
              </>
            </div>
          )}

          <div className="flex flex-1 space-x-5 font-serif p-2">
            <div className="flex-1">
              <p className="font-semibold text-lg">Charity Information:</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: donationData.charity_info ?? '',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5">
        {/* <div className="w-full lg:w-1/2 shadow-md drop-shadow-md overflow-y-auto">
          {donationData.images.map((item, index) => (
            <SupabaseImage
              src={item}
              key={index}
              className="border w-full h-auto"
              width={500}
              height={500}
              alt="charity"
            />
          ))}
        </div> */}

        {/* <div className="flex w-full flex-col space-y-5 justify-between">
          <Card>
            <CardHeader>
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                dangerouslySetInnerHTML={{
                  __html: donationData.mission_statement || '',
                }}
                className="text-gray-700"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Donation Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                dangerouslySetInnerHTML={{
                  __html: donationData.donation_amount_information || '',
                }}
                className="text-gray-700"
              />
            </CardContent>
          </Card>
        </div> */}
      </section>

      <section className="flex items-center justify-center">
        <Image
          className="w-[850px] h-auto"
          src={assets.brandingSVG.url}
          alt={assets.brandingSVG.alt}
          width={500}
          height={500}
        />
      </section>

      <Link
        href={`/donation/rules/${donationData.id}`}
        className="text-blue-700 text-center"
      >
        Get to know more about the rules here
      </Link>
    </div>
  );
};
