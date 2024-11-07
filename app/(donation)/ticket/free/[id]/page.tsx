import FreeTicket from '@/components/pages/ticket/free/freeTicket';
import {
  getDonationFormById,
  getTicketWhere,
  getUserIp,
  getUserLocation,
  getUserLocationCode,
} from '@/serverActions';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params: { id } }: ParamPropWithId) {
  const donationForm = await getDonationFormById(id);

  if (!donationForm) return notFound();

  if (new Date(donationForm.draw_date!) < new Date()) return notFound();

  const location = (await getUserLocation()).value;
  const ip = (await getUserIp()).value;

  if (location !== 'Florida') return redirect('/');

  if ((await getTicketWhere({ ip, donation_formId: id, isFree: true }))?.id)
    return (
      <p className="text-4xl font-mono text-center text-primary">
        OOPS! You&apos;ve already purchased a free ticket
      </p>
    );

  const locationCode = (await getUserLocationCode()).value;

  return <FreeTicket raffleId={id} locationCode={locationCode} />;
}
