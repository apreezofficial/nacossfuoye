'use client';

import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import { FileText, ArrowRight, Home, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = [
   {
      id: 'executive',
      title: 'Executive Memos',
      description: 'Manage official executive communications and directives.'
   },
   {
      id: 'src',
      title: 'Student Representative Memos',
      description: 'Manage memos from the Student Representative Council.'
   },
   {
      id: 'elecom',
      title: 'Electoral Committee Memos',
      description: 'Manage election guidelines, notices, and updates.'
   },
   {
      id: 'president',
      title: "President's Memos",
      description: 'Manage personal memos and addresses from the President.'
   }
];

export default function AdminDashBoardHub() {
   return (
      <div>
         <PageHeader title="Admin Dashboard">
            <Link href="/" aria-label="Go to home" className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-500 hover:text-primary hover:border-primary/30 transition-all duration-300 ease-out active:scale-[0.97]">
               <Home size={22} />
            </Link>
         </PageHeader>

         {/* Official Memos Section */}
         <div className="mt-8 mb-4">
            <h2 className="text-xl font-bold text-slate-800">Official Memos</h2>
            <p className="text-sm text-slate-500 mt-1">Manage and publish official NACOSS memorandums.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
               <Link 
                  key={category.id} 
                  href={`/admin/dashboard/${category.id}`}
                  className="relative group h-full flex flex-col p-6 rounded-2xl overflow-hidden border border-white/20 transition-[transform] duration-300 ease-out active:scale-[0.98] bg-primary/95 text-white backdrop-blur-md"
               >
                  {/* Memo Icon Background Decoration */}
                  <div className="absolute -bottom-6 -right-6 text-white/5 transition-transform duration-800 group-hover:scale-110 group-hover:-translate-y-2 group-hover:-translate-x-2 pointer-events-none">
                     <FileText size={180} strokeWidth={1.5} />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                     <div className="flex items-start justify-between mb-4">
                        <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs text-white backdrop-blur-sm border border-white/10 font-medium uppercase tracking-wider">
                           {category.id}
                        </span>
                     </div>

                     <div className="flex flex-col flex-1 py-2">
                        <h3 className="text-xl font-bold text-white leading-snug mb-2">
                           {category.title}
                        </h3>
                        <p className="text-white/70 text-sm font-medium leading-relaxed">
                           {category.description}
                        </p>
                     </div>
                     
                     <div className="mt-auto flex justify-between items-center border-t border-white/20 pt-4">
                        <div className="flex items-center text-sm font-semibold text-white opacity-90 group-hover:opacity-100 transition-opacity">
                           Manage Dashboard <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1 duration-300 ease-out" />
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>

         {/* Templates Section */}
         <div className="mt-12 mb-4">
            <h2 className="text-xl font-bold text-slate-800">Design Templates</h2>
            <p className="text-sm text-slate-500 mt-1">Generate flyers, graphics, and other visual assets.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link 
               href="/admin/templates/birthday"
               className="relative group h-full flex flex-col p-6 rounded-2xl overflow-hidden border border-white/20 transition-[transform] duration-300 ease-out active:scale-[0.98] bg-slate-800/95 text-white backdrop-blur-md"
            >
               {/* Icon Background Decoration */}
               <div className="absolute -bottom-6 -right-6 text-white/5 transition-transform duration-800 group-hover:scale-110 group-hover:-translate-y-2 group-hover:-translate-x-2 pointer-events-none">
                  <ImageIcon size={180} strokeWidth={1.5} />
               </div>

               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                     <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs text-white backdrop-blur-sm border border-white/10 font-medium uppercase tracking-wider">
                        Graphic Design
                     </span>
                  </div>

                  <div className="flex flex-col flex-1 py-2">
                     <h3 className="text-xl font-bold text-white leading-snug mb-2">
                        Birthday Template
                     </h3>
                     <p className="text-white/70 text-sm font-medium leading-relaxed">
                        Generate official birthday flyers on the fly. No database saving required.
                     </p>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center border-t border-white/20 pt-4">
                     <div className="flex items-center text-sm font-semibold text-white opacity-90 group-hover:opacity-100 transition-opacity">
                        Create Flyer <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1 duration-300 ease-out" />
                     </div>
                  </div>
               </div>
            </Link>
         </div>
      </div>
   );
}
