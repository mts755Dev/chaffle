'use server';

import prismaClient from '@/prisma/client';
import { Prisma, donation_form, ticket } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createDonationForm() {
  const data = await prismaClient.donation_form.create({});

  revalidatePath('/admin', 'layout');

  return data;
}

export async function getDonationForms() {
  return await prismaClient.donation_form.findMany({
    include: {
      _count: {
        select: {
          tickets: true,
        },
      },
    },
  });
}

export async function getTicketsAmountByRaffle(raffleId?: string) {
  return await prismaClient.ticket.groupBy({
    by: 'donation_formId',
    _sum: {
      quantity: true,
      amount: true,
    },
    where: {
      paid: true,
      ...(raffleId && { donation_formId: raffleId }),
    },
  });
}

export async function getDonationFormById(id: string) {
  return await prismaClient.donation_form.findUnique({
    where: { id },
  });
}

export async function updateForm({
  id,
  ...donationData
}: Partial<Omit<donation_form, 'id'>> & { id: string }) {
  const { stripeAccount, ...donationDataWithoutJSON } = donationData;

  const data = await prismaClient.donation_form.update({
    where: { id },
    data: {
      ...donationDataWithoutJSON,
      ...(stripeAccount && {
        stripeAccount: {
          ...(donationData?.stripeAccount as Prisma.JsonObject),
        },
      }),
    },
  });

  revalidatePath('/admin', 'layout');

  return data;
}

export async function deleteDonation(id: string) {
  const data = await prismaClient.donation_form.delete({
    where: {
      id,
    },
  });

  revalidatePath('/admin', 'layout');

  return data;
}

export async function createTicket({
  email,
  name,
  amount,
  quantity,
  raffleId,
  ip,
  isFree = false,
  paid = false,
  phone,
  address,
}: {
  email: string;
  name: string;
  amount: number;
  quantity: number;
  raffleId: string;
  ip: string;
  isFree?: boolean;
  paid?: boolean;
  phone: string;
  address: string;
}) {
  return await prismaClient.ticket.create({
    data: {
      amount,
      buyerEmail: email,
      buyerName: name,
      ip,
      phone,
      address,
      quantity,
      donation_formId: raffleId,
      isFree,
      paid,
    },
  });
}

export async function updateTicket({
  id,
  ...ticketData
}: Partial<Omit<ticket, 'id'>> & { id: string }) {
  const { stripeSession, ...ticketWithoutJSON } = ticketData;

  const data = await prismaClient.ticket.update({
    where: { id },
    data: {
      ...ticketWithoutJSON,
      ...(stripeSession && {
        stripeSession: {
          ...(ticketData?.stripeSession as Prisma.JsonObject),
        },
      }),
    },
  });

  return data;
}

export async function getTicketById(id: string) {
  return await prismaClient.ticket.findUnique({
    where: { id },
  });
}

export async function getTicketWhere(
  ticket: Partial<Omit<ticket, 'stripeSession'>>
) {
  return await prismaClient.ticket.findFirst({
    where: {
      ...ticket,
    },
  });
}

export async function getTicketsWhere(
  ticket: Partial<Omit<ticket, 'stripeSession'>>
) {
  return await prismaClient.ticket.findMany({
    where: {
      ...ticket,
    },
  });
}

export async function getWinnerTickets() {
  return await prismaClient.ticket.findMany({
    where: {
      isWinner: true,
    },
    include: {
      donation_form: {
        select: {
          title: true,
          id: true,
        },
      },
    },
  });
}

export async function getPaidTickets() {
  return await prismaClient.ticket.findMany({
    where: {
      paid: true
    },
    include: {
      donation_form: {
        select: {
          title: true,
        },
      },
    },
  });
}
