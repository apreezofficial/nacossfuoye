'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { House, Search, BookOpen, Layers, Clock, Sparkles, Send, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StatusProcessing, DocumentFolders } from '@esvigy/react';

const LEVELS = [
   { id: 'all', label: 'All Levels' },
   { id: '100', label: '100 Level' },
   { id: '200', label: '200 Level' },
   { id: '300', label: '300 Level' },
   { id: '400', label: '400 Level' },
];

const PREVIEWS = [
   {
      level: '100',
      title: '100 Level Foundations',
      courses: ['CSC 101 - Intro to Computer Science', 'MTH 101 - Elementary Mathematics I', 'PHY 101 - General Physics I', 'GST 101 - Use of English'],
      status: 'Scanning & Uploading',
      progress: 75,
   },
   {
      level: '200',
      title: '200 Level Core CS',
      courses: ['CSC 201 - Computer Programming I', 'CSC 203 - Foundations of Sequential Program', 'MTH 201 - Mathematical Methods I', 'CSC 205 - Discrete Structures'],
      status: 'Lecture Notes Verification',
      progress: 60,
   },
   {
      level: '300',
      title: '300 Level Advanced',
      courses: ['CSC 301 - Data Structures & Algorithms', 'CSC 303 - Operating Systems', 'CSC 305 - Database Design & Management', 'CSC 307 - Systems Analysis & Design'],
      status: 'Curating Past Questions',
      progress: 85,
   },
   {
      level: '400',
      title: '400 Level Specialization',
      courses: ['CSC 401 - Software Engineering', 'CSC 403 - Artificial Intelligence', 'CSC 405 - Computer Networks & Telecom', 'CSC 407 - Compiler Construction'],
      status: 'Slide Deck Processing',
      progress: 50,
   },
];

export default function LibraryPage() {
   const [activeLevel, setActiveLevel] = useState('all');
   const [searchQuery, setSearchQuery] = useState('');

   const filteredPreviews = activeLevel === 'all' 
      ? PREVIEWS 
      : PREVIEWS.filter(item => item.level === activeLevel);

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         <PageHeader
            title="Department Academic Library"
            description="Official course materials, lecture notes, syllabus guides, and past examination papers."
         >
            <Link
               href="/"
               aria-label="Go to home"
               className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-500 hover:text-primary hover:border-primary/30 transition-all duration-300 ease-out active:scale-[0.97]"
            >
               <House size={22} />
            </Link>
         </PageHeader>

         {/* Hero Processing Banner using @esvigy/react */}
         <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-8 md:p-12 shadow-2xl border border-white/10 mb-12">
            {/* Background decorative glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
               <div className="flex-1 space-y-5 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                     <Clock size={14} className="animate-spin" />
                     <span>Repository In Progress</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                     We are processing your <br />
                     <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-teal-300 to-green-400">
                        academic materials
                     </span>
                  </h2>

                  <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                     The NACOSS Academic Directorate and Course Representatives are currently cataloging, verifying, and indexing verified lecture slides, syllabus packs, and past exam questions for all levels.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-slate-200">
                        <CheckCircle2 size={16} className="text-green-400" />
                        <span>Curated by Course Reps</span>
                     </div>
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-slate-200">
                        <ShieldCheck size={16} className="text-blue-400" />
                        <span>Verified Department Syllabi</span>
                     </div>
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-slate-200">
                        <Sparkles size={16} className="text-yellow-300" />
                        <span>100% Free for Students</span>
                     </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                     <Link
                        href="/software"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-95"
                     >
                        <Send size={16} />
                        <span>Request a Specific Material or Tool</span>
                     </Link>
                     <a
                        href="#preview-section"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm backdrop-blur-md transition-all"
                     >
                        <span>View Upcoming Catalogs</span>
                        <ArrowRight size={16} />
                     </a>
                  </div>
               </div>

               {/* Animated Esvigy Illustration */}
               <div className="shrink-0 flex items-center justify-center">
                  <div className="relative group">
                     <div className="absolute -inset-6 bg-linear-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
                     <StatusProcessing
                        animated={true}
                        color="#38bdf8"
                        secondaryColor="rgba(255,255,255,0.08)"
                        className="w-56 h-56 sm:w-72 sm:h-72 filter drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Search & Level Filters */}
         <div id="preview-section" className="space-y-6 mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h3 className="text-2xl font-bold text-slate-900">Upcoming Course Vaults</h3>
                  <p className="text-slate-500 text-sm mt-1">Preview the course directories currently undergoing compilation and review.</p>
               </div>

               {/* Level Filter Tabs */}
               <div className="flex flex-wrap items-center gap-2">
                  {LEVELS.map(lvl => (
                     <button
                        key={lvl.id}
                        onClick={() => setActiveLevel(lvl.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                           activeLevel === lvl.id
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                        }`}
                     >
                        {lvl.label}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Upcoming Course Preview Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredPreviews.map((vault) => (
               <div
                  key={vault.level}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
               >
                  <div>
                     <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider border border-blue-200/50">
                           <BookOpen size={14} />
                           {vault.level} Level
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                           <Clock size={12} className="animate-spin" />
                           {vault.status}
                        </span>
                     </div>

                     <h4 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {vault.title}
                     </h4>

                     <p className="text-slate-500 text-sm mb-4">Courses being indexed in this department vault:</p>

                     <ul className="space-y-2 mb-6">
                        {vault.courses.map((course, i) => (
                           <li key={i} className="flex items-center text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5 shrink-0"></span>
                              <span className="truncate">{course}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  <div>
                     {/* Progress bar */}
                     <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="flex justify-between text-xs font-semibold text-slate-500">
                           <span>Compilation Progress</span>
                           <span className="text-blue-600 font-bold">{vault.progress}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                           <div
                              className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${vault.progress}%` }}
                           ></div>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Empty / Processing Footer Notice with DocumentFolders */}
         <div className="bg-slate-50 rounded-3xl p-8 border border-dashed border-slate-300 text-center flex flex-col items-center max-w-2xl mx-auto">
            <DocumentFolders animated={true} color="#2563eb" secondaryColor="rgba(37,99,235,0.08)" className="w-28 h-28 mb-3" />
            <h4 className="text-lg font-bold text-slate-800 mb-1">Have Materials to Contribute?</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-md">
               If you are a lecturer, course representative, or student with past questions or lecture notes, help us populate the digital vault faster.
            </p>
            <Link
               href="/software"
               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 text-sm font-bold shadow-sm transition-all"
            >
               <span>Contact Academic Committee</span>
               <ArrowRight size={16} />
            </Link>
         </div>
      </main>
   );
}
