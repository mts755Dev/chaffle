'use client';

import AdminDash from '@/components/layouts/adminDash';

export default function Layout({ children }: ReactChildren) {
  return <AdminDash>{children}</AdminDash>;
}
