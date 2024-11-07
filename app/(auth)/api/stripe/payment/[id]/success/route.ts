import { getPurchaseEmail } from '@/lib/emails';
import { sendEmail, updateTicket } from '@/serverActions';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const ticketId = params.id;

  const data = await updateTicket({
    id: ticketId,
    paid: true,
  });

  const emailData = await sendEmail({
    email: data.buyerEmail,
    subject: 'Chaffle Ticket purchase summary',
    body: getPurchaseEmail(data.quantity, data.id),
  });

  console.log("Email Data", emailData)

  return Response.json({ success: true });
}
