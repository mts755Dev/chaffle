import DeleteAlert from '@/components/shared/deleteAlert';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useStateProvider } from '@/providers';
import { deleteDonation } from '@/serverActions';
import { donation_form } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon, EyeIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const columns: ColumnDef<donation_form>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'soldAmount',
    header: 'Total Amount',
  },
  {
    accessorKey: 'soldQuantity',
    header: 'Tickets Sold',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell({ row }) {
      const id = row.getValue('id') as string;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { dispatch } = useStateProvider();

      const deleteHandler = async (id: string) => {
        try {
          await deleteDonation(id);
          toast({
            title: 'Record deleted successfully',
          });

          dispatch({
            type: 'delete',
            payload: id,
            reducer: 'raffles',
          });
        } catch (error: any) {
          toast({
            title: 'Failed',
            description: error,
          });
        }
      };

      return (
        <div className="flex items-center space-x-2">
          <Link href={`/admin/donation/preview/${id}`}>
            <EyeIcon className="w-5 h-5" />
          </Link>

          <Link href={`/admin/donation/edit/${id}`}>
            <PencilIcon className="w-5 h-5" />
          </Link>

          <DeleteAlert deleteHandler={() => deleteHandler(id)} />
        </div>
      );
    },
  },
];
