'use client';

import supabaseLoader from '@/supabase/image-loader';
import { Trash2Icon } from 'lucide-react';
import Image, { ImageProps } from 'next/image';
import React from 'react';

type Props = ImageProps & { handleDelete?: () => {} };

export const SupabaseImage = ({ handleDelete, ...props }: Props) => {
  return (
    <div className="relative max-w-full">
      <Image {...props} alt={props.alt ?? ''} loader={supabaseLoader} />
      {handleDelete && (
        <Trash2Icon
          onClick={handleDelete}
          className="w-5 h-5 text-red-500 -top-2 -right-5 absolute cursor-pointer z-10"
        />
      )}
    </div>
  );
};
