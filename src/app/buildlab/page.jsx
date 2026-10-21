'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
   ArrowRight,
   ShieldCheck,
   Lock,
   Code2,
   Rocket,
   Sparkles,
   ExternalLink,
   Github,
   CheckCircle2,
   Send,
   PlusCircle,
} from 'lucide-react';
import { WomanLaptop } from '@esvigy/react';

const SHOWCASE_PROJECTS = [
   {
      id: 'campus-escrow',
      title: 'PeerPay FUOYE',
      desc: 'Campus P2P escrow transaction protocol and hostel fee milestone protection service built for student trade.',
      category: 'FinTech',
      author: 'David Adebayo & Team',
      level: '300 Level',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
      demoUrl: 'https://github.com/nickfrostech/nacossfuoye',
      githubUrl: 'https://github.com/nickfrostech/nacossfuoye',
      featured: true,
   },
   {
      id: 'timetable-scheduler',
      title: 'Smart Timetable Pro',
      desc: 'Automated clash-free lecture & exam scheduling optimizer designed around departmental hall constraints.',
      category: 'EdTech',
      author: 'Amina Yusuf',
      level: '400 Level',
      tech: ['React', 'Python', 'FastAPI', 'Genetic Algorithms'],
      demoUrl: 'https://github.com/nickfrostech/nacossfuoye',
      githubUrl: 'https://github.com/nickfrostech/nacossfuoye',
      featured: true,
   },
   {
      id: 'study-bot',
      title: 'FUOYE Course AI Tutor',
      desc: 'Retrieval-augmented AI chat assistant indexed on departmental past questions and lecture PDF slides.',
      category: 'AI / ML',
      author: 'Samuel Okafor',
      level: '300 Level',
      tech: ['Next.js', 'LangChain', 'OpenAI', 'Supabase Vector'],
      demoUrl: 'https://github.com/nickfrostech/nacossfuoye',
      githubUrl: 'https://github.com/nickfrostech/nacossfuoye',
      featured: false,
   },
   {
      id: 'cgpa-analyzer',
      title: 'GradeMaster CGPA Simulator',
      desc: 'Visual GPA / CGPA trajectory planner supporting 5.0 grading systems, target grade advice, and course forecasting.',
      category: 'Student Tool',
      author: 'Bolanle Olatunji',
      level: '200 Level',
      tech: ['TypeScript', 'TailwindCSS', 'IndexedDB'],
      demoUrl: 'https://github.com/nickfrostech/nacossfuoye',
      githubUrl: 'https://github.com/nickfrostech/nacossfuoye',
      featured: false,
   },
   {
      id: 'hostel-connect',
      title: 'HostelFinder Oye',
      desc: 'Verified student off-campus accommodation marketplace with direct caretaker contact and review scores.',
      category: 'Web App',
      author: 'Tobi Daniels',
      level: '300 Level',
      tech: ['Vue.js', 'Firebase', 'Leaflet Maps'],
      demoUrl: 'https://github.com/nickfrostech/nacossfuoye',
      githubUrl: 'https://github.com/nickfrostech/nacossfuoye',
      featured: false,
   },
   {
      id: 'c-debugger-gui',
      title: 'QuickC Trace Engine',
      desc: 'Lightweight browser-based memory visualizer and pointer tracing utility created for CSC 201 & 315 students.',
      category: 'Developer Tool',
      author: 'Victor Adeleke',
      level: '400 Level',
      tech: ['WebAssembly', 'C/C++', 'Canvas API'],
      demoUrl: 'https://github.com/nickfrostech/nacossfuoye',
      githubUrl: 'https://github.com/nickfrostech/nacossfuoye',
      featured: true,
   },
];

const CATEGORIES = ['All', 'Web App', 'FinTech', 'EdTech', 'AI / ML', 'Developer Tool', 'Student Tool'];

export default function BuildLabPage() {
   const [activeView, setActiveView] = useState('showcase'); // 'showcase' | 'incubate' | 'submit'
   const [selectedCategory, setSelectedCategory] = useState('All');
   const [submissionType, setSubmissionType] = useState('product'); // 'product' | 'idea'
   const [submitted, setSubmitted] = useState(false);

   const filteredProjects = selectedCategory === 'All'
      ? SHOWCASE_PROJECTS
      : SHOWCASE_PROJECTS.filter((p) => p.category === selectedCategory);

   const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
   };

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         {/* BuildLab Hero Section (solid bg-teal-700 with WomanLaptop watermark) */}
         <section className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-teal-700 p-6 sm:p-10 md:p-14 mb-10 text-white">
            {/* Background Watermark WomanLaptop SVG */}
            <div className="absolute -right-8 -bottom-12 sm:-right-12 sm:-bottom-16 md:-right-16 md:-bottom-20 lg:-right-12 lg:-bottom-16 w-72 h-72 sm:w-96 sm:h-96 md:w-120 md:h-120 lg:w-xl lg:h-144 opacity-20 pointer-events-none select-none">
               <WomanLaptop
                  animated={true}
                  color="#ffffff"
                  secondaryColor="rgba(255,255,255,0.2)"
                  className="w-full h-full"
               />
            </div>

            {/* Foreground Details & Call to Action */}
            <div className="relative z-10 max-w-3xl space-y-5 text-left">
               <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white/90">
                  Department of Computer Science &bull; FUOYE
               </p>

               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                  BuildLab & <br />
                  <span className="text-white">
                     Student Showcase
                  </span>
               </h1>

               <p className="text-teal-50 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                  Discover production-ready software engineered by students, submit your apps for departmental recognition, or incubate raw tech ideas under full Mutual NDA protection.
               </p>

               {/* Call to Action Buttons */}
               <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <button
                     type="button"
                     onClick={() => {
                        setActiveView('showcase');
                        document.getElementById('buildlab-content')?.scrollIntoView({ behavior: 'smooth' });
                     }}
                     className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-teal-800 font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                     <span>Explore Student Showcase</span>
                     <ArrowRight size={18} />
                  </button>

                  <button
                     type="button"
                     onClick={() => {
                        setActiveView('submit');
                        document.getElementById('buildlab-content')?.scrollIntoView({ behavior: 'smooth' });
                     }}
                     className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/20 backdrop-blur-xs transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                     <PlusCircle size={16} className="text-white" />
                     <span>Submit Product or Idea</span>
                  </button>
               </div>
            </div>
         </section>

         {/* View Selector Tabs */}
         <div id="buildlab-content" className="scroll-mt-6 flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs w-full sm:w-auto">
               <button
                  type="button"
                  onClick={() => setActiveView('showcase')}
                  className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${activeView === 'showcase'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-teal-700'
                     }`}
               >
                  <Rocket size={16} className="shrink-0" />
                  <span>Student Showcase ({SHOWCASE_PROJECTS.length})</span>
               </button>

               <button
                  type="button"
                  onClick={() => setActiveView('incubate')}
                  className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${activeView === 'incubate'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-teal-700'
                     }`}
               >
                  <Lock size={16} className="shrink-0" />
                  <span>BuildLab Incubation (NDA)</span>
               </button>

               <button
                  type="button"
                  onClick={() => setActiveView('submit')}
                  className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${activeView === 'submit'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-teal-700'
                     }`}
               >
                  <Send size={16} className="shrink-0" />
                  <span>Submit to Showcase / Incubate</span>
               </button>
            </div>

            {/* Category filter when viewing showcase */}
            {activeView === 'showcase' && (
               <div className="flex flex-wrap items-center gap-1.5">
                  {CATEGORIES.map((cat) => (
                     <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${selectedCategory === cat
                              ? 'bg-teal-700 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:border-teal-300 hover:text-teal-700'
                           }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            )}
         </div>

         {/* VIEW 1: STUDENT SHOWCASE GRID */}
         {activeView === 'showcase' && (
            <div className="space-y-8 mb-16">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                     <div
                        key={project.id}
                        className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-teal-300 transition-all flex flex-col justify-between shadow-xs hover:shadow-md space-y-4"
                     >
                        <div className="space-y-3">
                           <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200/50 uppercase tracking-wider">
                                 {project.category}
                              </span>
                              {project.featured && (
                                 <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/70">
                                    ★ Featured
                                 </span>
                              )}
                           </div>

                           <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                              {project.title}
                           </h3>

                           <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                              {project.desc}
                           </p>

                           {/* Tech Stack Badges */}
                           <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {project.tech.map((t) => (
                                 <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                    {t}
                                 </span>
                              ))}
                           </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                           <div>
                              <p className="text-xs font-bold text-slate-800">{project.author}</p>
                              <p className="text-[11px] text-slate-400 font-medium">{project.level}</p>
                           </div>

                           <div className="flex items-center gap-2">
                              {project.githubUrl && (
                                 <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="View Source Code"
                                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                 >
                                    <Github size={18} />
                                 </a>
                              )}
                              {project.demoUrl && (
                                 <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200/60 transition-colors"
                                 >
                                    <span>Demo</span>
                                    <ExternalLink size={13} />
                                 </a>
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Prompt to submit */}
               <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center mx-auto space-y-3">
                  <Rocket className="w-10 h-10 text-teal-700" />
                  <h4 className="text-lg font-bold text-slate-900">Built Something Remarkable?</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
                     Share your application with the department, inspire fellow students, and get featured on the official showcase.
                  </p>
                  <button
                     type="button"
                     onClick={() => setActiveView('submit')}
                     className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all mt-1 cursor-pointer"
                  >
                     <span>Submit Your Project</span>
                     <ArrowRight size={14} />
                  </button>
               </div>
            </div>
         )}

         {/* VIEW 2: BUILDLAB INCUBATION (UNDER NDA) */}
         {activeView === 'incubate' && (
            <div className="space-y-12 mb-16">
               {/* 3 Pillars */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                     <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                        <Lock size={20} />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900">100% Student IP &amp; Mutual NDA</h3>
                     <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        Your concept remains completely your intellectual property. All consultations and pair-coding happen under binding departmental non-disclosure protection.
                     </p>
                  </div>

                  <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                     <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                        <Code2 size={20} />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900">Hands-on Engineering Support</h3>
                     <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        Work with senior departmental software builders, architecture advisors, and backend developers to transform raw specs into working code.
                     </p>
                  </div>

                  <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                     <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                        <Rocket size={20} />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900">Demo Day &amp; Campus Launch</h3>
                     <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        Launch to hundreds of active student users on campus, collect feedback, and demo to visiting tech founders and alumni at departmental exhibitions.
                     </p>
                  </div>
               </div>

               {/* Incubation Blueprint */}
               <div className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-8">
                  <div className="border-b border-slate-100 pb-5">
                     <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                        Incubation Roadmap
                     </span>
                     <h3 className="text-2xl font-bold text-slate-900 mt-1">
                        How BuildLab Takes Your Concept Forward
                     </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
                           01
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Confidential Idea Pitch</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                           Submit your problem statement and proposed software approach under digital NDA.
                        </p>
                     </div>

                     <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
                           02
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Tech Architecture Review</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                           Technical Directorate reviews feasibility, stacks, database schemas, and API design.
                        </p>
                     </div>

                     <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
                           03
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Pair-Coding Sprints</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                           Execute structured weekend build sprints to code core features and user interfaces.
                        </p>
                     </div>

                     <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                        <div className="w-7 h-7 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
                           04
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Deploy &amp; Feature</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                           Deploy production app to cloud, onboard users, and list proudly on the departmental showcase.
                        </p>
                     </div>
                  </div>

                  <div className="pt-2 text-center">
                     <button
                        type="button"
                        onClick={() => {
                           setSubmissionType('idea');
                           setActiveView('submit');
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
                     >
                        <Lock size={16} />
                        <span>Pitch Your Concept Under NDA</span>
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* VIEW 3: SUBMISSION PORTAL (PRODUCT OR IDEA) */}
         {activeView === 'submit' && (
            <div className="max-w-2xl mx-auto mb-16">
               <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
                  {/* Selector: Finished Product vs Incubate Idea */}
                  <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
                     <button
                        type="button"
                        onClick={() => setSubmissionType('product')}
                        className={`flex-1 min-w-[140px] py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${submissionType === 'product'
                              ? 'bg-white text-teal-800 shadow-xs'
                              : 'text-slate-600 hover:text-teal-800'
                           }`}
                     >
                        Feature Finished Product
                     </button>

                     <button
                        type="button"
                        onClick={() => setSubmissionType('idea')}
                        className={`flex-1 min-w-[140px] py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${submissionType === 'idea'
                              ? 'bg-white text-teal-800 shadow-xs'
                              : 'text-slate-600 hover:text-teal-800'
                           }`}
                     >
                        Incubate Raw Idea (NDA)
                     </button>
                  </div>

                  {submitted && (
                     <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                        <span>Submission received! The Technical Directorate will review and get in touch with you shortly.</span>
                     </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="submitter-name" className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name</label>
                           <input
                              id="submitter-name"
                              type="text"
                              required
                              placeholder="e.g. John Doe"
                              aria-label="Your Full Name"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
                           />
                        </div>
                        <div>
                           <label htmlFor="submitter-level" className="block text-xs font-bold text-slate-700 uppercase mb-1">Academic Level</label>
                           <select
                              id="submitter-level"
                              required
                              aria-label="Academic Level"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-600 bg-white"
                           >
                              <option value="100">100 Level</option>
                              <option value="200">200 Level</option>
                              <option value="300">300 Level</option>
                              <option value="400">400 Level</option>
                           </select>
                        </div>
                     </div>

                     <div>
                        <label htmlFor="project-title" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                           {submissionType === 'product' ? 'Project / Product Title' : 'Idea / Startup Concept Title'}
                        </label>
                        <input
                           id="project-title"
                           type="text"
                           required
                           aria-label={submissionType === 'product' ? 'Project or Product Title' : 'Idea or Startup Concept Title'}
                           placeholder={submissionType === 'product' ? 'e.g. PeerPay FUOYE' : 'e.g. Campus Automated Lost & Found'}
                           className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
                        />
                     </div>

                     {submissionType === 'product' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div>
                              <label htmlFor="demo-url" className="block text-xs font-bold text-slate-700 uppercase mb-1">Live Demo URL</label>
                              <input
                                 id="demo-url"
                                 type="url"
                                 aria-label="Live Demo URL"
                                 placeholder="https://..."
                                 className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
                              />
                           </div>
                           <div>
                              <label htmlFor="github-url" className="block text-xs font-bold text-slate-700 uppercase mb-1">GitHub Repo URL</label>
                              <input
                                 id="github-url"
                                 type="url"
                                 aria-label="GitHub Repository URL"
                                 placeholder="https://github.com/..."
                                 className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
                              />
                           </div>
                        </div>
                     )}

                     <div>
                        <label htmlFor="submitter-phone" className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp / Phone Number</label>
                        <input
                           id="submitter-phone"
                           type="tel"
                           required
                           aria-label="WhatsApp or Phone Number"
                           placeholder="e.g. 08123456789"
                           className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
                        />
                     </div>

                     <div>
                        <label htmlFor="project-desc" className="block text-xs font-bold text-slate-700 uppercase mb-1">
                           {submissionType === 'product' ? 'Description & Technologies Used' : 'Problem Solved & What Help You Need'}
                        </label>
                        <textarea
                           id="project-desc"
                           rows={4}
                           required
                           aria-label={submissionType === 'product' ? 'Description & Technologies Used' : 'Problem Solved & What Help You Need'}
                           placeholder={submissionType === 'product' ? 'Tell us what your product does and the tech stack you built it with...' : 'Describe what problem your idea solves and what engineering/mentor support you need...'}
                           className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
                        />
                     </div>

                     {submissionType === 'idea' && (
                        <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200/60 flex items-start gap-2.5 text-xs text-teal-900 font-medium">
                           <ShieldCheck size={18} className="text-teal-700 shrink-0 mt-0.5" />
                           <span>Mutual NDA Protected: Your submission is strictly confidential and protected under departmental intellectual property policy.</span>
                        </div>
                     )}

                     <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xs transition-all active:scale-98 cursor-pointer"
                     >
                        {submissionType === 'product' ? 'Submit Product to Showcase' : 'Pitch Idea to Technical Directorate'}
                     </button>
                  </form>
               </div>
            </div>
         )}
      </main>
   );
}
