import Donation from '@/components/pages/donation';
import {
  getDonationFormById,
  getTicketWhere,
  getTicketsAmountByRaffle,
  getTicketsWhere,
  getUserLocation,
  sendEmail,
  updateTicket,
} from '@/serverActions';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function Page({ params: { id } }: ParamPropWithId) {
  const donationForm = await getDonationFormById(id);

  if (!donationForm) return notFound();

  if (!(donationForm?.stripeAccount as any)?.id) return notFound();

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

      console.log('Random Ticket', randomTicket);

      if (randomTicket) {
        await updateTicket({
          id: randomTicket.id,
          isWinner: true,
        });

        // Sending email to winner
        sendEmail({
          email: randomTicket.buyerEmail,
          subject: `Congratulations you have won the chaffle`,
          body: `You'll be contacted soon with your prize money`,
        });
      }
    }
  }

  console.log(
    cookies().get('ck-user-location'),
    'Checking user location',
    donationForm.raffleLocation,
    (await getUserLocation()).value
  );
  if (donationForm.raffleLocation !== (await getUserLocation()).value)
    return notFound();

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
