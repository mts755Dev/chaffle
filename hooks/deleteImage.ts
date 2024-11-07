import { toast } from '@/components/ui/use-toast';
import adminClient from '@/supabase/adminClient';

export const useDeleteImage = () => {
  return async (path: string) => {
    try {
      toast({
        title: 'Removing Image ...',
      });

      const deleted = await adminClient.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
        .remove([path]);

      if (deleted.error) throw deleted.error;

      return deleted.data;
    } catch (error: any) {
      toast({
        title: 'Image not deleted',
        description: error?.message ?? '',
      });
    }
  };
};
