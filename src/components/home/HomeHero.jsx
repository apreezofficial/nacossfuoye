'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomeHero() {
   return (
      <section className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-primary p-6 sm:p-10 md:p-14 mb-8 text-white">
         {/* Background Watermark Logo - Large, absolutely positioned, seamless background element with no hover state */}
         <div className="absolute -right-12 -bottom-16 sm:-right-16 sm:-bottom-20 md:-right-20 md:-bottom-24 lg:-right-16 lg:-bottom-24 w-80 h-80 sm:w-96 sm:h-96 md:w-lg md:h-128 lg:w-160 lg:h-160 opacity-20 pointer-events-none select-none">
            <Image
               src="/nacossfuoye_logo.png"
               alt="NACOSS FUOYE Departmental Logo"
               fill
               sizes="(max-width: 768px) 384px, 640px"
               priority
               className="object-contain"
            />
         </div>

         {/* Foreground Details & Call to Action */}
         <div className="relative z-10 max-w-3xl space-y-5 text-center sm:text-left">
            <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white/90">
               Department of Computer Science &bull; FUOYE
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
               Welcome to <br />
               <span className="text-white">
                  NACOSS Fuoye Portal
               </span>
            </h1>

            <p className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-xl mx-auto sm:mx-0 font-medium">
               The official digital hub for Computer Science students at Federal University Oye-Ekiti. Access verified memos, courseware, dev software, student idea incubation under full NDA, and hackathons.
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3.5">
               <Link
                  href="/memos"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-primary font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 active:scale-95"
               >
                  <span>Explore Memos</span>
                  <ArrowRight size={18} />
               </Link>

               <Link
                  href="/buildlab"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/20 backdrop-blur-xs transition-all duration-300 active:scale-95"
               >
                  <Sparkles size={16} className="text-white" />
                  <span>Explore BuildLab</span>
               </Link>
            </div>
         </div>
      </section>
   );
}
