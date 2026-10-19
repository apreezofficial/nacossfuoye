'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { House, ExternalLink, RefreshCw, Maximize2, Minimize2, Laptop, Code2, DownloadCloud, Sparkles, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { WomanLaptop, ActionUpload } from '@esvigy/react';

// Default Google Form Embed URL (Can be overridden via NEXT_PUBLIC_SOFTWARE_FORM_URL environment variable)
const DEFAULT_FORM_URL = process.env.NEXT_PUBLIC_SOFTWARE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSc7z8w4r5x1m0s9_demo_software_request/viewform?embedded=true';

const POPULAR_TOOLS = [
   { name: 'VS Code & Extensions', category: 'Code Editor', desc: 'Pre-bundled with C/C++, Python, Java & Web development extensions.' },
   { name: 'Java JDK 21 LTS', category: 'Runtime & SDK', desc: 'Oracle / OpenJDK 21 for CSC 201 & Object Oriented Programming.' },
   { name: 'Python 3.12 + Pip', category: 'Interpreter', desc: 'Standard data science, AI & introductory scripting environment.' },
   { name: 'Cisco Packet Tracer', category: 'Networking', desc: 'Essential simulator for CSC 405 Computer Networks & Telecommunications.' },
   { name: 'MySQL Workbench + XAMPP', category: 'Database', desc: 'Relational DB server and visual schema design suite for CSC 305.' },
   { name: 'Oracle VirtualBox', category: 'Virtualization', desc: 'Linux Ubuntu virtual machine environments for OS courses.' },
];

export default function SoftwareSubmissionPage() {
   const [formUrl, setFormUrl] = useState(DEFAULT_FORM_URL);
   const [customUrlInput, setCustomUrlInput] = useState('');
   const [showUrlEditor, setShowUrlEditor] = useState(false);
   const [isFullscreen, setIsFullscreen] = useState(false);
   const [iframeKey, setIframeKey] = useState(0);
   const [activeTab, setActiveTab] = useState('form');

   const handleReload = () => {
      setIframeKey(prev => prev + 1);
   };

   const handleSaveCustomUrl = (e) => {
      e.preventDefault();
      if (!customUrlInput.trim()) return;
      let url = customUrlInput.trim();
      if (!url.includes('embedded=true')) {
         url = url.includes('?') ? `${url}&embedded=true` : `${url}?embedded=true`;
      }
      setFormUrl(url);
      setShowUrlEditor(false);
      handleReload();
   };

   // Clean URL for direct link without embedded=true
   const directLink = formUrl.replace('?embedded=true', '').replace('&embedded=true', '');

   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         <PageHeader
            title="Software Request & Submission"
            description="Request developer tools, specialized coursework environments, or submit student-built applications."
         >
            <Link
               href="/"
               aria-label="Go to home"
               className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-500 hover:text-primary hover:border-primary/30 transition-all duration-300 ease-out active:scale-[0.97]"
            >
               <House size={22} />
            </Link>
         </PageHeader>

         {/* Hero Showcase with WomanLaptop illustration */}
         <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-900 via-orange-950 to-slate-900 text-white p-8 md:p-12 shadow-2xl border border-white/10 mb-10">
            <div className="absolute top-0 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-bold uppercase tracking-wider">
                     <Laptop size={14} />
                     <span>NACOSS Tech Hub</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                     Get the software you need for{' '}
                     <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-300 to-yellow-300">
                        academic excellence
                     </span>
                  </h2>

                  <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                     Need high-data developer tools, compilers, or IDEs? Request offline installers directly from the NACOSS Technical Directorate, or submit your own custom software to be shared with fellow departmental students.
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                     <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                        <CheckCircle2 size={16} className="text-orange-400" />
                        <span>Zero Data Waste (Offline Flash Drives)</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                        <ShieldCheck size={16} className="text-amber-400" />
                        <span>Pre-configured & Virus-Scanned</span>
                     </div>
                  </div>
               </div>

               {/* Animated Esvigy Illustration */}
               <div className="shrink-0 flex items-center justify-center">
                  <div className="relative group">
                     <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-2xl"></div>
                     <WomanLaptop
                        animated={true}
                        color="#fb923c"
                        secondaryColor="rgba(255,255,255,0.08)"
                        className="w-52 h-52 sm:w-64 sm:h-64 filter drop-shadow-2xl relative z-10 transition-transform duration-300 group-hover:scale-105"
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Navigation Tabs */}
         <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
               <button
                  onClick={() => setActiveTab('form')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                     activeTab === 'form'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'text-slate-600 hover:text-orange-600'
                  }`}
               >
                  <Code2 size={16} />
                  <span>Submission Google Form</span>
               </button>
               <button
                  onClick={() => setActiveTab('packages')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                     activeTab === 'packages'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'text-slate-600 hover:text-orange-600'
                  }`}
               >
                  <DownloadCloud size={16} />
                  <span>Available Lab Packages</span>
               </button>
            </div>

            {activeTab === 'form' && (
               <div className="flex items-center gap-2">
                  <button
                     onClick={handleReload}
                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-orange-600 text-xs font-semibold shadow-xs transition-colors"
                     title="Reload Form"
                  >
                     <RefreshCw size={14} />
                     <span>Reload</span>
                  </button>

                  <a
                     href={directLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-orange-600 text-xs font-semibold shadow-xs transition-colors"
                     title="Open Google Form in a new tab"
                  >
                     <ExternalLink size={14} />
                     <span>Open in Google Forms</span>
                  </a>

                  <button
                     onClick={() => setIsFullscreen(!isFullscreen)}
                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-orange-600 text-xs font-semibold shadow-xs transition-colors"
                     title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                     {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                     <span>{isFullscreen ? 'Exit Fullscreen' : 'Expand'}</span>
                  </button>

                  <button
                     onClick={() => setShowUrlEditor(!showUrlEditor)}
                     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100 text-xs font-semibold shadow-xs transition-colors"
                     title="Change Google Form Link"
                  >
                     <span>Change Form Link</span>
                  </button>
               </div>
            )}
         </div>

         {/* Optional Form URL Customizer */}
         {showUrlEditor && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 animate-in fade-in duration-200">
               <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                     <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                        Google Form Embed Configuration
                     </p>
                     <p className="text-xs text-slate-600 mb-3">
                        Paste the direct Google Form link (e.g. from Google Forms → Send → &lt;&gt; Embed HTML or link). The form will render automatically inside this page.
                     </p>
                     <form onSubmit={handleSaveCustomUrl} className="flex flex-col sm:flex-row gap-2">
                        <input
                           type="url"
                           value={customUrlInput}
                           onChange={(e) => setCustomUrlInput(e.target.value)}
                           placeholder="https://docs.google.com/forms/d/e/.../viewform"
                           className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                           type="submit"
                           className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors shadow-sm"
                        >
                           Update Embed
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         )}

         {/* Tab 1: Embedded Google Form */}
         {activeTab === 'form' && (
            <div
               className={`bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden transition-all duration-300 ${
                  isFullscreen ? 'fixed inset-4 z-50 shadow-2xl flex flex-col' : 'relative'
               }`}
            >
               {isFullscreen && (
                  <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
                     <div className="flex items-center gap-2">
                        <Laptop size={18} className="text-orange-400" />
                        <span className="font-bold text-sm">NACOSS Software Request Form</span>
                     </div>
                     <button
                        onClick={() => setIsFullscreen(false)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                     >
                        <Minimize2 size={16} />
                     </button>
                  </div>
               )}

               <div className={`w-full relative bg-slate-50 ${isFullscreen ? 'flex-1' : 'min-h-[720px]'}`}>
                  <iframe
                     key={iframeKey}
                     src={formUrl}
                     title="Software Request & Submission Form"
                     className="w-full h-full min-h-[720px] border-0"
                     loading="lazy"
                  >
                     <div className="p-8 text-center text-slate-500">
                        Loading Google Form... If it fails to load,{' '}
                        <a href={directLink} target="_blank" rel="noopener noreferrer" className="text-orange-600 font-bold underline">
                           click here to open directly
                        </a>.
                     </div>
                  </iframe>
               </div>
            </div>
         )}

         {/* Tab 2: Available Packages & Information */}
         {activeTab === 'packages' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {POPULAR_TOOLS.map((tool, index) => (
                     <div
                        key={index}
                        className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                     >
                        <div>
                           <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                                 {tool.category}
                              </span>
                              <CheckCircle2 size={16} className="text-green-500" />
                           </div>
                           <h4 className="text-xl font-bold text-slate-900 mb-2">{tool.name}</h4>
                           <p className="text-slate-500 text-sm leading-relaxed mb-4">{tool.desc}</p>
                        </div>
                        <button
                           onClick={() => setActiveTab('form')}
                           className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                        >
                           <span>Request This Tool</span>
                           <DownloadCloud size={14} />
                        </button>
                     </div>
                  ))}
               </div>

               {/* Collection Instructions Card with ActionUpload illustration */}
               <div className="bg-slate-900 text-white rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 space-y-3">
                     <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full">
                        How to Collect Your Installers
                     </span>
                     <h3 className="text-2xl font-bold">Physical CS Department Lab Pickup</h3>
                     <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                        To save your mobile internet data, the Department Software Directorate maintains an up-to-date physical flash drive depot at the Department Computer Science Lab. Come with a USB drive of at least 16GB after submitting the request form above.
                     </p>
                  </div>

                  <div className="shrink-0 flex items-center justify-center">
                     <ActionUpload animated={true} color="#fb923c" secondaryColor="rgba(255,255,255,0.08)" className="w-32 h-32" />
                  </div>
               </div>
            </div>
         )}
      </main>
   );
}
