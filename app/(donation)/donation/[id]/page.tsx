'use client';

import { LoaderCircleIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params: { id } }: ParamPropWithId) {
  useEffect(() => {
    if (id) redirect(`/donation/raffle/${id}`);
  }, [id]);

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen">
      <LoaderCircleIcon className="animate-spin w-72 h-72 text-center" />
    </div>
  );
}
