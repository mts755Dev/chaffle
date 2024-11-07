'use client';

import DataTable from '@/components/shared/dataTable';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { columns } from './components/tableColumns';
import { useRouter } from 'next/navigation';
import { createDonationForm } from '@/serverActions';
import { Prisma, donation_form } from '@prisma/client';
import { useEffect } from 'react';
import { useStateProvider } from '@/providers';

type Props = {
  donationsData: donation_form[];
  totalTickets: (Prisma.PickEnumerable<
    Prisma.TicketGroupByOutputType,
    'donation_formId'
  > & {
    _sum: {
      quantity: number | null;
      amount: number | null;
    };
  })[];
};

export const Donation = ({ donationsData, totalTickets }: Props) => {
  const router = useRouter();

  const {
    state: { raffles },
    dispatch,
  } = useStateProvider();

  useEffect(() => {
    if (donationsData)
      dispatch({ type: 'set', payload: donationsData, reducer: 'raffles' });
  }, [donationsData, dispatch]);

  async function createForm() {
    try {
      const form = await createDonationForm();

      dispatch({ type: 'create', payload: form, reducer: 'raffles' });

      router.push(`/admin/donation/edit/${form.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="primary-heading">Raffles</h1>
        <Button onClick={createForm}>
          <PlusIcon className="w-5 h-5" />
          <span>Create Raffle</span>
        </Button>
      </div>
      <DataTable
        filterColumn="title"
        columns={columns}
        data={raffles.forms.map((form) => {
          const ticket = totalTickets.find(
            (ticket) => ticket.donation_formId === form.id
          );
          const updatedForm = {
            ...form,
            soldAmount: ticket?._sum.amount ?? 0,
            soldQuantity: ticket?._sum.quantity ?? 0,
          };
          return updatedForm;
        })}
      />
    </div>
  );
};
