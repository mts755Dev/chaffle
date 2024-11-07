import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { donation_form } from '@prisma/client';
import React from 'react';

type Props = {
  donationData: donation_form;
};

export const Rules = ({ donationData }: Props) => {
  return (
    <section className="container mx-auto max-w-5xl mt-10 lg:mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <p
            dangerouslySetInnerHTML={{
              __html: donationData.rules || '',
            }}
            className="text-gray-700"
          />
        </CardContent>
      </Card>
    </section>
  );
};
