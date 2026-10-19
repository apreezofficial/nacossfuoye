'use client';

import Link from 'next/link';
import { NotFoundLaptop } from '@esvigy/react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
   return (
      <main className="max-w-4xl mx-auto px-4 py-16 min-h-[80vh] flex flex-col items-center justify-center text-center">
         <div className="relative mb-6">
            <NotFoundLaptop animated={true} color="#039133" secondaryColor="rgba(3,145,51,0.08)" className="w-64 h-64 mx-auto filter drop-shadow-xl" />
         </div>
         <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full mb-3">
            Error 404 • Page Not Found
         </span>
         <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Lost in the Department Directory?
         </h1>
         <p className="max-w-md text-slate-500 font-medium text-base mb-8">
            The memo, resource, or page you were looking for doesn't exist or might have been relocated.
         </p>
         <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
               href="/"
               className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
               <Home size={18} />
               <span>Return to Portal Home</span>
            </Link>
            <Link
               href="/memos"
               className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:border-primary/40 hover:text-primary transition-all duration-300"
            >
               <ArrowLeft size={18} />
               <span>Browse Memos</span>
            </Link>
         </div>
      </main>
   );
}
