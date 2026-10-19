'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { House } from 'lucide-react';
import { DocumentFolders } from '@esvigy/react';

function Loading() {
   return (
      <div className="flex justify-center items-center h-64">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
   );
}

import MemoCard from '@/components/MemoCard';
import PageHeader from '@/components/PageHeader';

const CATEGORIES = [
   { id: 'all', label: 'All Memos' },
   { id: 'executive', label: 'Executive' },
   { id: 'src', label: 'SRC' },
   { id: 'elecom', label: 'Electoral Committee' },
   { id: 'president', label: 'President' },
];

export default function MemosList() {
   const [fetchError, setFetchError] = useState(null);
   const [data, setData] = useState(null);
   const [order, setOrder] = useState(false);
   const [loading, setLoading] = useState(true);
   const [filterType, setFilterType] = useState('all');
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

   const filteredData = data ? (filterType === 'all' ? data : data.filter(item => item.type === filterType)) : [];

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         <PageHeader 
            title="Official Memos"
            description="View the latest updates and announcements."
            onSortChange={setOrder}
         >
            <Link href="/" aria-label="Go to home" className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-500 hover:text-primary hover:border-primary/30 transition-all duration-300 ease-out active:scale-[0.97]">
               <House size={22} />
            </Link>
         </PageHeader>

         {/* Category Filter */}
         <div className="flex flex-wrap items-center gap-2 mb-8">
            {CATEGORIES.map(category => (
               <button
                  key={category.id}
                  onClick={() => setFilterType(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${filterType === category.id ? 'bg-primary text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary'}`}
               >
                  {category.label}
               </button>
            ))}
         </div>

         {loading ? (
            <Loading />
         ) : fetchError ? (
            <div className="rounded-xl bg-red-50 p-6 border border-red-100">
               <h3 className="text-sm font-medium text-red-800">{fetchError}</h3>
            </div>
         ) : filteredData && filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredData.map(item => (
                  <MemoCard
                     key={item.id}
                     {...item}
                     isAdminView={false}
                     href={item.authStatus ? `/admin/edit/${encodeURIComponent(item.reference)}` : `/${encodeURIComponent(item.reference)}`}
                  />
               ))}
            </div>
         ) : (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center">
               <DocumentFolders animated={true} color="#039133" secondaryColor="rgba(3,145,51,0.08)" className="w-36 h-36 mb-4 filter drop-shadow-sm" />
               <h3 className="text-xl font-bold text-slate-800 mb-1">No Memos Found</h3>
               <p className="text-slate-500 font-medium max-w-sm text-sm mb-6">
                  There are currently no official memos published under the <span className="font-semibold text-slate-700 capitalize">"{filterType}"</span> category.
               </p>
               {filterType !== 'all' && (
                  <button
                     onClick={() => setFilterType('all')}
                     className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm"
                  >
                     View All Memos
                  </button>
               )}
            </div>
         )}
      </main>
   );
}
