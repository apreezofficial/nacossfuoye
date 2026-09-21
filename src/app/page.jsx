'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { UserStar } from 'lucide-react';

function Loading() {
   return (
      <div className="flex justify-center items-center h-64">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
   );
}

import MemoCard from '@/components/MemoCard';

import PageHeader from '@/components/PageHeader';

export default function Home() {
   const [fetchError, setFetchError] = useState(null);
   const [data, setData] = useState(null);
   const [order, setOrder] = useState(false);
   const [loading, setLoading] = useState(true);
   const supabase = createClient();

   useEffect(() => {
      const fetchData = async () => {
         const { data: fetchedData, error } = await supabase
            .from('memo')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: order });

         if (error) {
            setFetchError('Could not fetch memos');
            setData(null);
         } else {
            setData(fetchedData);
            setFetchError(null);
         }
      };

      fetchData();
      const timer = setTimeout(() => setLoading(false), 800);

      const channel = supabase
         .channel('memo-changes')
         .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'memo' },
            () => fetchData()
         )
         .subscribe();

      return () => {
         clearTimeout(timer);
         supabase.removeChannel(channel);
      };
   }, [order, supabase]);

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         <PageHeader 
            title="Official Memos"
            description="View the latest updates and announcements."
            onSortChange={setOrder}
         >
            <Link href="/admin/dashboard" aria-label="Go to admin dashboard" className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-500 hover:text-primary hover:border-primary/30 transition-all duration-300 ease-out active:scale-[0.97]">
               <UserStar size={22} />
            </Link>
         </PageHeader>

         {loading ? (
            <Loading />
         ) : fetchError ? (
            <div className="rounded-xl bg-red-50 p-6 border border-red-100">
               <h3 className="text-sm font-medium text-red-800">{fetchError}</h3>
            </div>
         ) : data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {data.map(item => (
                  <MemoCard
                     key={item.id}
                     {...item}
                     isAdminView={false}
                     href={item.authStatus ? `/admin/edit/${encodeURIComponent(item.reference)}` : `/${encodeURIComponent(item.reference)}`}
                  />
               ))}
            </div>
         ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
               <p className="text-slate-500 font-medium">No official memos available yet.</p>
            </div>
         )}
      </main>
   );
}
