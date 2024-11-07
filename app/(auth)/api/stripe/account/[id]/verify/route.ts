import {
  createStripeAccountLink,
  retrieveAccountDetails,
  updateForm,
} from '@/serverActions';
import { Prisma } from '@prisma/client';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const stripeAccountId = params.id;
  const account = await retrieveAccountDetails(stripeAccountId);

  if (!account.charges_enabled) {
    const accountLink = await createStripeAccountLink(stripeAccountId);
    return Response.redirect(accountLink.url);
  }

  await updateForm({
    id: account.metadata?.donationId!,
    stripeAccount: account as unknown as Prisma.JsonValue,
  });

  return Response.json({ success: true });
}
