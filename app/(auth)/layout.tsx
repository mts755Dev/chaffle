import Auth from '@/components/layouts/auth';
import MainLayout from '@/components/layouts/mainLayout';
import { createClient } from '@/supabase/server';

export default async function Layout({ children }: ReactChildren) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <MainLayout>
      <Auth user={data?.user}>{children}</Auth>
    </MainLayout>
  );
}
