import DonationEdit from '@/components/pages/admin/donation/edit';
import { getDonationFormById } from '@/serverActions';
import { notFound } from 'next/navigation';

export default async function Page({ params: { id } }: ParamPropWithId) {
  const donationForm = await getDonationFormById(id);

  if (!donationForm) return notFound();

  return <DonationEdit donationData={donationForm} />;
}
