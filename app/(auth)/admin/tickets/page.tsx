import TicketsTable from '@/components/pages/admin/tickets';
import { getPaidTickets } from '@/serverActions';

export default async function Page() {
  const ticketsData = await getPaidTickets();

  return <TicketsTable tickets={ticketsData} />;
}

export const dynamic = 'force-dynamic';
