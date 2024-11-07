'use client';

import React from 'react';
import DonationEditForm from '@/components/forms/donation/edit';
import { Separator } from '@/components/ui/separator';
import UploadBackgroundImage from './components/uploadBackgroundImage';
// import UploadImages from './components/uploadImages';
import { Prisma, donation_form } from 'prisma/prisma-client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createStripeAccount, createStripeAccountLink } from '@/serverActions';
import { toast } from '@/components/ui/use-toast';

type Props = {
  donationData: donation_form;
};

export const DonationEdit = ({ donationData }: Props) => {
  async function linkStripeAccount() {
    try {
      const account = await createStripeAccount(donationData.id);

      const accountLink = await createStripeAccountLink(account.id);

      window.location.assign(accountLink.url);
    } catch (error) {
      toast({
        title: 'Failed. Try again later',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="primary-heading">Raffle Information</h1>
        <Link href={`/admin/donation/preview/${donationData.id}`}>
          <span className="text-primary font-semibold">Preview</span>
        </Link>
      </div>

      {!(donationData.stripeAccount as Prisma.JsonObject)?.charges_enabled ? (
        <Button onClick={linkStripeAccount}>Link your account</Button>
      ) : (
        <span className="text-white px-4 py-1 bg-primary rounded-sm">
          Account linked already
        </span>
      )}

      <DonationEditForm
        formData={{
          title: donationData?.title ?? '',
          charityInfo: donationData?.charity_info ?? '',
          id: donationData?.id!,
          donationAmountInformation:
            donationData?.donation_amount_information ?? '',
          missionStatement: donationData?.mission_statement ?? '',
          rules: donationData?.rules ?? '',
          drawDate: donationData?.draw_date ?? '',
          raffleLocation: donationData?.raffleLocation ?? '',
        }}
      />

      <Separator />

      <UploadBackgroundImage
        imageData={{
          id: donationData.id,
          backgroundImage: donationData.backgroundImage ?? '',
        }}
      />

      {/* <Separator />

      <UploadImages
        imagesData={{
          id: donationData.id,
          donation_images: donationData.images,
        }}
      /> */}
    </div>
  );
};
