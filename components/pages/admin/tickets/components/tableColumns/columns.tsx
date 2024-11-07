import { ticket } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ticket>[] = [
  {
    accessorKey: 'id',
    header: 'Ticket Id',
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
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
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
