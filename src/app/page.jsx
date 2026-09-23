'use client';

import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { FileText, ArrowRight, UserStar } from 'lucide-react';

export default function Home() {
   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         <PageHeader title="NACOSS Portal">
            <Link href="/admin/dashboard" aria-label="Go to admin dashboard" className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-500 hover:text-primary hover:border-primary/30 transition-all duration-300 ease-out active:scale-[0.97]">
               <UserStar size={22} />
            </Link>
         </PageHeader>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            <Link 
               href="/memos"
               className="relative group h-full flex flex-col p-6 rounded-2xl overflow-hidden border border-white/20 transition-[transform] duration-300 ease-out active:scale-[0.98] bg-primary/95 text-white backdrop-blur-md"
            >
               {/* Memo Icon Background Decoration */}
               <div className="absolute -bottom-6 -right-6 text-white/5 transition-transform duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:-translate-x-2 pointer-events-none">
                  <FileText size={180} strokeWidth={1.5} />
               </div>

               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                     <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs text-white backdrop-blur-sm border border-white/10 font-medium uppercase tracking-wider">
                        Memos
                     </span>
                  </div>

                  <div className="flex flex-col flex-1 py-2">
                     <h3 className="text-xl font-bold text-white leading-snug mb-2">
                        Official Memos
                     </h3>
                     <p className="text-white/70 text-sm font-medium leading-relaxed">
                        View the latest updates, directives, and announcements from the department.
                     </p>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center border-t border-white/20 pt-4">
                     <div className="flex items-center text-sm font-semibold text-white opacity-90 group-hover:opacity-100 transition-opacity">
                        View Memos <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1 duration-300 ease-out" />
                     </div>
                  </div>
               </div>
            </Link>
         </div>
      </main>
   );
}
