'use client';

import { useState, useRef, useEffect } from 'react';
import Letterhead from '@/components/Letterhead';
import { createClient } from '@/utils/supabase/client';
import DownloadBtn from '@/components/DownloadBtn';
import useScale from '@/hooks/useScale';
import { House } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { AddNewMemo, UpdateMemo } from '@/components/PublishBtn';

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

const PREFIX_MAP = {
   executive: 'NACOSS',
   elecom: 'CSCEC',
   src: 'CSCSRC',
   president: 'CSCPR'
};

export default function MemoForm({ isNew = true, initialData = {}, memoType = 'executive' }) {
   const [date, setDate] = useState(initialData.date || '');
   const [referenceNumber, setReferenceNumber] = useState(initialData.reference || '');
   const supabase = createClient();
   const [content, setContent] = useState(() => {
      let initContent = initialData.content || '';
      if (initialData.head && initContent && !initContent.includes(initialData.head)) {
         initContent = `<h1>${initialData.head}</h1>${initContent}`;
      } else if (initialData.head && !initContent) {
         initContent = `<h1>${initialData.head}</h1>`;
      }
      return initContent;
   });

   const getDerivedHead = () => {
      if (typeof window === 'undefined') return initialData.head || "Untitled Memo";
      if (!content) return "Untitled Memo";
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const firstElement = doc.body.firstElementChild;
      const text = firstElement ? firstElement.textContent.trim() : "";
      return text || "Untitled Memo";
   };

   const derivedHead = getDerivedHead();
   const [viewMode, setViewMode] = useState('split');

   const letterHeadRef = useRef(null);
   const previewRef = useRef(null);

   const publishRef = useRef(null);

   useEffect(() => {
      if (!isNew || initialData.reference) return;

      const fetchNextReference = async () => {
         const prefix = PREFIX_MAP[memoType] || 'NACOSS';
         const currentYearSuffix = new Date().getFullYear().toString().slice(-2);

         const { data, error } = await supabase
            .from('memo')
            .select('reference')
            .eq('type', memoType)
            .like('reference', `${prefix}/${currentYearSuffix}/%`)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

         if (error && error.code !== 'PGRST116') {
            console.error('Error fetching last reference:', error);
         }

         let nextNum = 1;
         if (data && data.reference) {
            const parts = data.reference.split('/');
            if (parts.length === 3) {
               const lastNum = parseInt(parts[2], 10);
               if (!isNaN(lastNum)) {
                  nextNum = lastNum + 1;
               }
            }
         }

         const paddedNum = nextNum.toString().padStart(3, '0');
         setReferenceNumber(`${prefix}/${currentYearSuffix}/${paddedNum}`);
      };

      fetchNextReference();
   }, [isNew, memoType, initialData.reference, supabase]);

   useScale({ letterHeadRef, previewRef });

   const handleBeforeDownload = async () => {
      if (publishRef.current) {
         return await publishRef.current.publish();
      }
      return true;
   };

   return (
      <div>
         <PageHeader
            title={isNew ? 'Create New Memo' : 'Edit Memo'}
         >
            <div className="flex flex-wrap items-center gap-3">
               <Link href={`/admin/dashboard/${memoType}`} aria-label="Go back to dashboard" className="inline-flex items-center justify-center p-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-primary hover:border-primary/30 transition-all duration-300">
                  <House size={22} />
               </Link>
               <DownloadBtn elementRef={letterHeadRef} referenceNumber={referenceNumber || 'draft'} onBeforeDownload={handleBeforeDownload} />
               {isNew ? (
                  <AddNewMemo ref={publishRef} referenceNumber={referenceNumber} date={date} head={derivedHead} content={content} type={memoType} />
               ) : (
                  <UpdateMemo ref={publishRef} referenceNumber={referenceNumber} date={date} head={derivedHead} content={content} type={memoType} />
               )}
            </div>
         </PageHeader>

         <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
            {/* Form Section */}
            <aside className="p-5 rounded-2xl lg:sticky lg:top-8 min-w-0 shadow-xl">
               <div className="space-y-4">
                  <div className="flex justify-around bg-slate-100/80 p-1 rounded-xl w-full">
                     <button onClick={() => setViewMode('split')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${viewMode === 'split' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-primary'}`}>Split View</button>
                     <button onClick={() => setViewMode('document')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${viewMode === 'document' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-primary'}`}>Document View</button>
                  </div>
                  
                  <div>
                     <label htmlFor="dateInput" className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Date</label>
                     <input
                        type="date"
                        id="dateInput"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-primary/70 focus:border-primary  outline-none transition-all duration-300 text-slate-900 bg-white/90 focus:bg-white backdrop-blur-sm"
                     />
                  </div>

                  <div>
                     <label htmlFor="refInput" className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Reference Number</label>
                     <input
                        type="text"
                        id="refInput"
                        value={referenceNumber}
                        onChange={e => setReferenceNumber(e.target.value)}
                        placeholder={`${PREFIX_MAP[memoType] || 'NACOSS'}/25/...`}
                        disabled={!isNew}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 text-slate-900 backdrop-blur-sm ${!isNew ? 'bg-white/50 border-white/10 cursor-not-allowed opacity-80' : 'border-primary/70 focus:border-primary  bg-white/90 focus:bg-white'}`}
                     />
                  </div>


                  {viewMode === 'split' && (
                     <div>
                        <label htmlFor="quill-editor" className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Memo Content</label>
                        <div className="rounded-xl bg-white/90 backdrop-blur-sm transition-all duration-300">
                           <SimpleEditor setContent={setContent} content={content} mode="split" />
                        </div>
                     </div>
                  )}
               </div>
            </aside>

            {/* Preview Section */}
            <main className="shadow-xl rounded-2xl w-full relative flex flex-col min-w-0">
               <div id="toolbar-portal-target" className="w-full z-50 sticky top-0" />
               <div ref={previewRef} className="w-full relative aspect-794/1123 overflow-hidden">
                  <Letterhead
                     date={date}
                     referenceNumber={referenceNumber}
                     content={content}
                     letterHeadRef={letterHeadRef}
                     viewMode={viewMode}
                     setContent={setContent}
                     type={memoType}
                  />
               </div>
            </main>
         </div>
      </div>
   );
}
