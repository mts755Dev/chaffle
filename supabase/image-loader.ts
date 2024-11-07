const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID ?? '';

export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${src}?width=${width}&quality=${quality || 75}`;
}
