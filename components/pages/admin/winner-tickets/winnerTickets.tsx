import DataTable from '@/components/shared/dataTable';
import { ticket } from '@prisma/client';
import React from 'react';
import { columns } from './components/tableColumns/columns';

type Props = {
  tickets: ticket[];
};

export const TicketsTable: React.FC<Props> = ({ tickets }) => {
  return (
    <DataTable filterColumn="buyerName" columns={columns} data={tickets} />
  );
};
