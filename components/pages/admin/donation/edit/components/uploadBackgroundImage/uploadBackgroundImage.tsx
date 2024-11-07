'use client';

import SupabaseImage from '@/components/shared/supabaseImage';
import UploadFile from '@/components/shared/uploadFile';
import { toast } from '@/components/ui/use-toast';
import { useDeleteImage } from '@/hooks/deleteImage';
import { useUploadImage } from '@/hooks/uploadImage';
import { updateForm } from '@/serverActions';
import React, { useState } from 'react';

type Props = {
  imageData: {
    id: string;
    backgroundImage: string;
  };
};

export const UploadBackgroundImage = ({
  imageData: { backgroundImage, id },
}: Props) => {
  const [image, setImage] = useState(backgroundImage);

  const handleImageUpload = useUploadImage();
  const deleteImage = useDeleteImage();

  async function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const data = await handleImageUpload(event, id, true);
    if (!data?.length) return;
    await updateForm({
      backgroundImage: data[0],
      id,
    });
    setImage(data[0] ?? image);
  }

  async function handleDelete(path: string) {
    try {
      const data = await deleteImage(path);
      if (!data) return;
      await updateForm({
        backgroundImage: null,
        id,
      });

      setImage('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message ?? '',
      });
    }
  }

  return (
    <div className="flex flex-col space-y-5">
      <p className="primary-heading">Origanization Logo</p>
      <p className="text-xs text-red-600 font-semibold">
        *Make sure to add only .PNG images with size under 1 MB for better.
        results
      </p>
      {!image ? (
        <UploadFile
          acceptFormats="image/png, image/jpeg, image/jpg, svg"
          className="w-48 h-48"
          handleFile={handleImage}
        />
      ) : (
        <SupabaseImage
          width={256}
          height={256}
          handleDelete={() => handleDelete(image)}
          src={image}
          alt="main image"
        />
      )}
    </div>
  );
};
