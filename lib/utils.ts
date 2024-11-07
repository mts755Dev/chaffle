import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isImageValid(file: File) {
  return (
    file.size / 1000000 <= 2 &&
    ['png', 'jpeg', 'jpg', 'svg'].includes(file.type.split('/')[1])
  );
}
