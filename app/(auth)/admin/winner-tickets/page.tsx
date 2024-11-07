import TicketsTable from '@/components/pages/admin/winner-tickets';
import { getTicketsAmountByRaffle, getWinnerTickets } from '@/serverActions';

export default async function Page() {
  const ticketsData = await getWinnerTickets();

  let groupedRaffles = (
    await Promise.all(
      ticketsData.map((ticketData) =>
        getTicketsAmountByRaffle(ticketData.donation_formId!)
      )
    )
  ).flat();

  const ticketsWithTotal = ticketsData.map((ticket) => {
    const totalRaffle = groupedRaffles.find(
      (raffle) => raffle.donation_formId === ticket.donation_formId
    );
    return {
      ...ticket,
      paidQuantity: totalRaffle?._sum.quantity,
      totalAmount: totalRaffle?._sum.amount,
      estimatedAmount: totalRaffle?._sum.amount! / 2,
    };
  });
  return <TicketsTable tickets={ticketsWithTotal ?? []} />;
}

export const dynamic = 'force-dynamic';
