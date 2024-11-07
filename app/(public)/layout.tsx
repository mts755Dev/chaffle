import Layout from '@/components/layouts/mainLayout';

export default async function PublicLayout({ children }: ReactChildren) {
  return <Layout>{children}</Layout>;
}
