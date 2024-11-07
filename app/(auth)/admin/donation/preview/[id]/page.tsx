import Donation from '@/components/pages/donation';
import { getWinnerEmail } from '@/lib/emails';
import {
  getDonationFormById,
  getTicketWhere,
  getTicketsAmountByRaffle,
  getTicketsWhere,
  sendEmail,
  updateTicket,
} from '@/serverActions';
import { notFound } from 'next/navigation';

export default async function Page({ params: { id } }: ParamPropWithId) {
  const donationForm = await getDonationFormById(id);

  if (!donationForm) return notFound();

  if (new Date(donationForm.draw_date!) < new Date()) {
    const raffleTicket = await getTicketWhere({
      donation_formId: donationForm.id,
      isWinner: true,
    });

    if (!raffleTicket) {
      const raffleTickets = await getTicketsWhere({
        donation_formId: donationForm.id,
        paid: true,
      });

      const randomTicket =
        raffleTickets[Math.floor(Math.random() * raffleTickets.length - 1)];

      if (randomTicket) {
        await updateTicket({
          id: randomTicket.id,
          isWinner: true,
        });

        // Sending email to winner
        await sendEmail({
          email: randomTicket.buyerEmail,
          subject: `Congratulations! Winner`,
          body: getWinnerEmail(randomTicket.id),
        });
      }
    }
  }

  const ticketsTotal = await getTicketsAmountByRaffle(donationForm.id);
  const winnerTicket =
    new Date(donationForm.draw_date!) < new Date()
      ? await getTicketWhere({
          isWinner: true,
          donation_formId: donationForm.id,
        })
      : null;

  return (
    <Donation
      winnerTicket={winnerTicket}
      donationData={donationForm}
      ticketTotal={ticketsTotal[0]}
    />
  );
}
