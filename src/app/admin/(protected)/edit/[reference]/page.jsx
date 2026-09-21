import { createClient } from '@/utils/supabase/server';
import MemoForm from '@/components/MemoForm';
import { notFound } from 'next/navigation';

export default async function EditMemo({ params }) {
  const { reference } = await params;
  const decodedReference = decodeURIComponent(reference);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('memo')
    .select('*')
    .eq('reference', decodedReference)
    .single();

  if (error || !data) {
    notFound();
  }

  return <MemoForm isNew={false} initialData={data} />;
}
