'use client';

import { toast } from '@/components/ui/use-toast';
import { isImageValid } from '@/lib/utils';
import adminClient from '@/supabase/adminClient';

export const useUploadImage = () => {
  async function handleBackgroundImage(
    event: React.ChangeEvent<HTMLInputElement>,
    raffleId: string,
    isBackground: boolean
  ) {
    const files = event.target.files;
    if (!files?.length) return;

    const imageFiles = [];

    for (const file of Array.from(files)) {
      if (!isImageValid(file)) {
        toast({
          title: 'Invalid Payload',
          description:
            "Image should be less than 2MB and should be of type 'PNG' or 'JPEG'",
          variant: 'destructive',
        });
      } else {
        imageFiles.push(file);
      }
    }

    toast({ title: 'Uploading file(s) ...' });

    try {
      const uploadedImages = await Promise.all(
        imageFiles.map((file) =>
          adminClient.storage
            .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
            .upload(
              `/public/${raffleId}/${isBackground ? 'background' : 'images'}/${file.name}`,
              file
            )
        )
      );

      toast({ title: 'File(s) upload successful' });

      const data = [];

      for (const image of uploadedImages) {
        if (image.data?.path) data.push(image.data.path);
        if (image.error?.message)
          toast({
            title: 'Image upload failed',
            description: image.error.message,
            variant: 'destructive',
          });
      }

      return data;
    } catch (error) {
      toast({
        title: 'Image(s) upload unsuccessful. Try Again',
        variant: 'destructive',
      });

      return;
    }
  }

  return handleBackgroundImage;
};
