'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Wallet, Construction } from 'lucide-react';

export default function TreasurerPage() {
   const [loading, setLoading] = useState(true);
   const supabase = createClient();
   const router = useRouter();

   useEffect(() => {
      async function checkAccess() {
         const { data: { user } } = await supabase.auth.getUser();
         if (user) {
            const { data: roleData } = await supabase
               .from('user_roles')
               .select('role')
               .eq('user_email', user.email)
               .single();
            
            const role = roleData?.role;
            if (!['admin', 'president', 'treasurer', 'gen_sec', 'ags', 'pro', 'vp'].includes(role)) {
               router.replace('/admin/dashboard');
               return;
            }
         }
         setLoading(false);
      }
      
      checkAccess();
   }, [supabase, router]);

   if (loading) {
      return (
         <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
         </div>
      );
   }

   return (
      <div className="animate-in fade-in duration-500">
         <PageHeader title="Treasurer Records">
            <Link href="/admin/dashboard" aria-label="Go back to Hub" className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-500 hover:text-primary hover:border-primary/30 transition-all duration-300">
               <ArrowLeft size={22} />
            </Link>
         </PageHeader>

         <div className="mt-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
               {/* Decorative background */}
               <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                  <Wallet size={300} />
               </div>
               
               <div className="px-6 py-20 sm:px-12 sm:py-24 flex flex-col items-center justify-center text-center relative z-10">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-500 shadow-sm border border-emerald-100/50">
                     <Construction size={48} strokeWidth={1.5} />
                  </div>
                  
                  <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">
                     Feature Under Construction
                  </h2>
                  
                  <p className="text-lg text-slate-500 max-w-lg mb-8 leading-relaxed font-medium">
                     The Treasurer Records module is currently being built. Soon you'll be able to track detailed treasury reports, budget allocations, and society funds here.
                  </p>
                  
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-full text-slate-600 font-bold text-sm border border-slate-200 shadow-sm">
                     <Clock size={16} className="text-slate-400" />
                     <span>Coming Soon</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
