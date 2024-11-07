import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadIcon } from 'lucide-react';
import React from 'react';

type Props = {
  handleFile: any;
  acceptFormats?: string;
  className?: string;
  multiple?: boolean;
};

export const UploadFile = ({
  className = '',
  acceptFormats = '*',
  handleFile,
  multiple = false,
}: Props) => {
  return (
    <Label
      className={`flex items-center justify-center w-full h-full border border-dashed border-black cursor-pointer ${className}`}
    >
      <UploadIcon className="w-7 h-7" />
      <Input
        className="hidden"
        onChange={handleFile}
        type="file"
        multiple={multiple}
        accept={acceptFormats}
      />
    </Label>
  );
};
