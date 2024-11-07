import Rules from '@/components/pages/rules';
import { getDonationFormById } from '@/serverActions';
import { notFound } from 'next/navigation';

export default async function Page({ params: { id } }: ParamPropWithId) {
  const donationForm = await getDonationFormById(id);

  if (!donationForm) return notFound();

  return <Rules donationData={donationForm} />;
}
