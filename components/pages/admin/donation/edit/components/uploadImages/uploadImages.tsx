'use client';

import SupabaseImage from '@/components/shared/supabaseImage';
import UploadFile from '@/components/shared/uploadFile';
import { toast } from '@/components/ui/use-toast';
import { useDeleteImage } from '@/hooks/deleteImage';
import { useUploadImage } from '@/hooks/uploadImage';
import { updateForm } from '@/serverActions';
import React, { useState } from 'react';

type Props = {
  imagesData: {
    id: string;
    donation_images: string[];
  };
};

export const UploadImages = ({
  imagesData: { donation_images, id },
}: Props) => {
  const [images, setImages] = useState<string[]>(donation_images ?? []);

  const deleteImage = useDeleteImage();

  const handleImageUpload = useUploadImage();

  async function handleDelete(path: string) {
    try {
      await deleteImage(path);

      const filteredImages = images.filter((image) => image !== path);

      await updateForm({
        images: filteredImages,
        id,
      });

      setImages(filteredImages);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message ?? '',
      });
    }
  }

  async function handleImages(event: React.ChangeEvent<HTMLInputElement>) {
    const data = await handleImageUpload(event, id, false);
    if (!data?.length) return;
    await updateForm({
      images: [...images, ...data],
      id,
    });
    setImages([...images, ...data]);
  }

  return (
    <div className="flex flex-col space-y-5">
      <p className="primary-heading">Add Images</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-2">
        {Boolean(images.length) &&
          images.map((image, index) => (
            <SupabaseImage
              handleDelete={() => handleDelete(image)}
              width={256}
              height={256}
              src={image}
              key={index}
              alt="donation image"
            />
          ))}
        <UploadFile
          acceptFormats="image/png, image/jpeg, image/jpg"
          className="w-48 h-48"
          multiple={true}
          handleFile={handleImages}
        />
      </div>
    </div>
  );
};
