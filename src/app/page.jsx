'use client';

import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { FileText, ArrowRight, UserStar, Image as ImageIcon, Sparkles, Gamepad2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function Home() {
   const [quotes, setQuotes] = useState({ dyk: '', invest_friday: '' });
   const supabase = createClient();

   useEffect(() => {
      const fetchQuotes = async () => {
         const { data, error } = await supabase.from('quotes').select('dyk, invest_friday').eq('id', 1).single();
         if (data && !error) setQuotes(data);
      };
      fetchQuotes();
   }, [supabase]);

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-[85vh] flex flex-col">
         <PageHeader title="NACOSS Portal">
            <Link href="/admin/dashboard" aria-label="Go to admin dashboard" title="Admin Dashboard" className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-500 hover:text-primary hover:border-primary/30 transition-all duration-300 ease-out active:scale-[0.97]">
               <UserStar size={22} />
            </Link>
         </PageHeader>

         {/* Scrolling Quotes Marquee */}
         {(quotes.dyk || quotes.invest_friday) && (
            <div className="w-full bg-slate-900 text-white overflow-hidden py-3 mt-6 rounded-2xl flex border border-white/10 shadow-lg">
               <div className="animate-marquee flex gap-12 font-medium items-center whitespace-nowrap px-4 w-max">
                  {quotes.dyk && <span><strong className="text-primary mr-2 uppercase tracking-wide">DYK of the week:</strong> {quotes.dyk}</span>}
                  {quotes.invest_friday && <span><strong className="text-orange-400 mr-2 uppercase tracking-wide">Invest Friday:</strong> {quotes.invest_friday}</span>}
                  {/* Duplicated for seamless scrolling */}
                  {quotes.dyk && <span><strong className="text-primary mr-2 uppercase tracking-wide">DYK of the week:</strong> {quotes.dyk}</span>}
                  {quotes.invest_friday && <span><strong className="text-orange-400 mr-2 uppercase tracking-wide">Invest Friday:</strong> {quotes.invest_friday}</span>}
                  {quotes.dyk && <span><strong className="text-primary mr-2 uppercase tracking-wide">DYK of the week:</strong> {quotes.dyk}</span>}
                  {quotes.invest_friday && <span><strong className="text-orange-400 mr-2 uppercase tracking-wide">Invest Friday:</strong> {quotes.invest_friday}</span>}
               </div>
            </div>
         )}

         {/* Hero Section */}
         <div className="flex flex-col items-center justify-center text-center mt-12 mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
               <Sparkles size={16} />
               <span>Department of Computer Science</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
               Welcome to the <br />
               <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-green-500">
                  NACOSS Portal
               </span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-500 font-medium">
               An official portal for the Department of Computer Science. Access official memos, departmental directives, and generate your custom NACOSS birthday flyers instantly.
            </p>
         </div>

         {/* Cards Section */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
            {/* Memos Card */}
            <Link
               href="/memos"
               className="relative group flex flex-col p-8 rounded-3xl overflow-hidden border border-white/20 transition-[transform] duration-300 ease-out active:scale-[0.98] bg-primary/95 text-white shadow-xl hover:shadow-2xl backdrop-blur-md min-h-70"
            >
               <div className="absolute -bottom-8 -right-8 text-white/5 transition-transform duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-4 pointer-events-none">
                  <FileText size={240} strokeWidth={1} />
               </div>

               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                     <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm border border-white/10 font-bold uppercase tracking-widest">
                        Information
                     </span>
                  </div>

                  <div className="flex flex-col flex-1 py-2">
                     <h3 className="text-3xl font-bold text-white leading-snug mb-3">
                        Official Memos
                     </h3>
                     <p className="text-white/80 text-base font-medium leading-relaxed max-w-[85%]">
                        View the latest updates, directives, and announcements from the department.
                     </p>
                  </div>

                  <div className="mt-auto flex justify-between items-center border-t border-white/20 pt-6">
                     <div className="flex items-center text-sm font-semibold text-white opacity-90 group-hover:opacity-100 transition-opacity">
                        View Memos <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1.5 duration-300 ease-out" />
                     </div>
                  </div>
               </div>
            </Link>

            {/* Stakeholders Card */}
            <Link
               href="/stakeholders"
               className="relative group flex flex-col p-8 rounded-3xl overflow-hidden border border-white/20 transition-[transform] duration-300 ease-out active:scale-[0.98] bg-green-700 text-white shadow-xl hover:shadow-2xl backdrop-blur-md min-h-70"
            >
               <div className="absolute -bottom-8 -right-8 text-white/5 transition-transform duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-4 pointer-events-none">
                  <UserStar size={240} strokeWidth={1} />
               </div>

               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                     <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm border border-white/10 font-bold uppercase tracking-widest">
                        Directory
                     </span>
                  </div>

                  <div className="flex flex-col flex-1 py-2">
                     <h3 className="text-3xl font-bold text-white leading-snug mb-3">
                        Stakeholders
                     </h3>
                     <p className="text-white/80 text-base font-medium leading-relaxed max-w-[85%]">
                        Meet the executives, class representatives, and other NACOSS stakeholders.
                     </p>
                  </div>

                  <div className="mt-auto flex justify-between items-center border-t border-white/20 pt-6">
                     <div className="flex items-center text-sm font-semibold text-white opacity-90 group-hover:opacity-100 transition-opacity">
                        View Profiles <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1.5 duration-300 ease-out" />
                     </div>
                  </div>
               </div>
            </Link>

            {/* Birthday Flyer Card */}
            <Link
               href="/birthday"
               className="relative group flex flex-col p-8 rounded-3xl overflow-hidden border border-white/20 transition-[transform] duration-300 ease-out active:scale-[0.98] bg-slate-800 text-white shadow-xl hover:shadow-2xl backdrop-blur-md min-h-70"
            >
               <div className="absolute -bottom-8 -right-8 text-white/5 transition-transform duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-4 pointer-events-none">
                  <ImageIcon size={240} strokeWidth={1} />
               </div>

               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                     <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm border border-white/10 font-bold uppercase tracking-widest">
                        Design Hub
                     </span>
                  </div>

                  <div className="flex flex-col flex-1 py-2">
                     <h3 className="text-3xl font-bold text-white leading-snug mb-3">
                        Birthday Flyer
                     </h3>
                     <p className="text-white/80 text-base font-medium leading-relaxed max-w-[85%]">
                        Generate and download your custom official NACOSS birthday design instantly.
                     </p>
                  </div>

                  <div className="mt-auto flex justify-between items-center border-t border-white/20 pt-6">
                     <div className="flex items-center text-sm font-semibold text-white opacity-90 group-hover:opacity-100 transition-opacity">
                        Generate Design <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1.5 duration-300 ease-out" />
                     </div>
                  </div>
               </div>
            </Link>

            {/* Games Hub Card */}
            <Link
               href="/games"
               className="relative group flex flex-col p-8 rounded-3xl overflow-hidden border border-white/20 transition-[transform] duration-300 ease-out active:scale-[0.98] bg-purple-700 text-white shadow-xl hover:shadow-2xl backdrop-blur-md min-h-70"
            >
               <div className="absolute -bottom-8 -right-8 text-white/5 transition-transform duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-4 pointer-events-none">
                  <Gamepad2 size={240} strokeWidth={1} />
               </div>

               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                     <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm border border-white/10 font-bold uppercase tracking-widest">
                        Entertainment
                     </span>
                  </div>

                  <div className="flex flex-col flex-1 py-2">
                     <h3 className="text-3xl font-bold text-white leading-snug mb-3">
                        Games Hub
                     </h3>
                     <p className="text-white/80 text-base font-medium leading-relaxed max-w-[85%]">
                        Play weekly mini-games created by open-source contributors and compete for the top score.
                     </p>
                  </div>

                  <div className="mt-auto flex justify-between items-center border-t border-white/20 pt-6">
                     <div className="flex items-center text-sm font-semibold text-white opacity-90 group-hover:opacity-100 transition-opacity">
                        Play Games <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1.5 duration-300 ease-out" />
                     </div>
                  </div>
               </div>
            </Link>

         </div>
      </main>
   );
}
