import Donation from '@/components/pages/admin/donation';
import { getDonationForms, getTicketsAmountByRaffle } from '@/serverActions';

export default async function Page() {
  const donationsData = await getDonationForms();
  const totalTickets = await getTicketsAmountByRaffle();

  return <Donation donationsData={donationsData} totalTickets={totalTickets} />;
}
