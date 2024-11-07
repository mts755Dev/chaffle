'use server';

import transporter from '@/lib/nodemailer';
import adminClient from '@/supabase/adminClient';
import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createUser({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const authClient = adminClient.auth;

  const { data, error } = await authClient.admin.createUser({
    email,
    password,
    role: 'admin',
    email_confirm: true,
    user_metadata: {
      firstName,
      lastName,
    },
  });

  return { user: { ...data.user }, error: error?.message };
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) redirect('/');

  revalidatePath('/', 'layout');

  return { ...data.user };
}

export async function signout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) return error?.message;

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function getUserIp() {
  return { ...cookies().get('ck-user-ip') };
}

export async function getUserLocation() {
  const userLocation = { ...cookies().get('ck-user-location') };
  return userLocation
}

export async function getUserLocationCode() {
  return { ...cookies().get('ck-user-location-short') };
}

export async function sendEmail({
  email,
  subject,
  body,
}: {
  email: string;
  subject: string;
  body: string;
}) {
  try {
    const info = await transporter.sendMail({
      to: email,
      from: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      subject: subject, // Subject line
      html: body
    });

    console.log('Message sent: %s', info.messageId);

    return info.messageId;
  } catch (error: any) {
    console.log(error);
    return error?.message as string
  }
}
