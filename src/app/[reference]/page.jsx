import { createClient } from '@/utils/supabase/server';
import ViewMemoClient from './ViewMemoClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
   const { reference } = await params;
   const decodedReference = decodeURIComponent(reference);

   const supabase = await createClient();
   const { data } = await supabase
      .from('memo')
      .select('head, date, reference')
      .eq('reference', decodedReference)
      .single();

   if (!data) {
      return {
         title: 'Memo Not Found',
      };
   }

   return {
      title: `${data.head} | NACOSS Memo`,
      description: `Official NACOSS Memorandum. Ref: ${data.reference}. Date: ${data.date}`,
      openGraph: {
         title: data.head,
         description: `Official NACOSS Memorandum. Ref: ${data.reference}. Date: ${data.date}`,
         type: 'article',
      },
      twitter: {
         card: 'summary_large_image',
         title: data.head,
         description: `Official NACOSS Memorandum. Ref: ${data.reference}`,
      },
   };
}

export default async function ViewMemoPage({ params }) {
   const { reference } = await params;
   const decodedReference = decodeURIComponent(reference);

   const supabase = await createClient();

   const { data: currentMemo, error } = await supabase
      .from('memo')
      .select('*')
      .eq('reference', decodedReference)
      .single();

   if (error || !currentMemo) {
      notFound();
   }

   const [
      { data: previous },
      { data: next }
   ] = await Promise.all([
      supabase
         .from('memo')
         .select('reference')
         .eq('is_published', true)
         .gt('created_at', currentMemo.created_at)
         .order('created_at', { ascending: false })
         .limit(1),
      supabase
         .from('memo')
         .select('reference')
         .eq('is_published', true)
         .lt('created_at', currentMemo.created_at)
         .order('created_at', { ascending: false })
         .limit(1)
   ]);

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         <ViewMemoClient
            memo={currentMemo}
            previousRef={previous?.[0]?.reference || null}
            nextRef={next?.[0]?.reference || null}
         />
      </main>
   );
}
