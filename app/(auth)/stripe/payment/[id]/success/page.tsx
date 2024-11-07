import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/payment/${params.id}/success`
  );

  redirect('/');
}
