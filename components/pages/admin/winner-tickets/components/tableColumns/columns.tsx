import { ticket } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ticket>[] = [
  {
    accessorKey: 'id',
    header: 'Ticket Id',
  },
  {
    id: 'referenceId',
    header: 'Reference Id',
    accessorFn: (row) => row.id?.split('-')[0] ?? row.id,
  },
  {
    accessorKey: 'buyerName',
    header: 'Name',
  },
  {
    accessorKey: 'buyerEmail',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'donation_form.title',
    header: 'Raffle',
  },
  {
    accessorKey: 'amount',
    header: 'Paid Amount',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Price',
  },
  {
    accessorKey: 'estimatedAmount',
    header: 'Estimated Prize',
  },
  {
    accessorKey: 'isFree',
    header: 'Free Ticket',
  },
  {
    accessorKey: 'paid',
    header: 'Paid',
  },
  {
    accessorKey: 'created_at',
    header: 'Created on',
  },
];
