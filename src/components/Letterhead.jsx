import DOMPurify from 'dompurify';

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

const MEMO_CONFIGS = {
   executive: {
      background: '/assets/letter_head.svg',
      referenceClass: 'absolute top-26 left-[635px] text-[11pt] text-black font-nasalization text-left',
      dateClass: 'absolute top-32 left-[645px] text-[11pt] text-black font-nasalization text-left',
      contentClass: 'absolute top-48 font-medium text-[14pt] w-[85%] text-left left-1/2 -translate-x-1/2 text-black'
   },
   src: {
      background: '/assets/src_letter_head.svg',
      referenceClass: 'absolute top-[120px] left-[590px] text-[11pt] text-black font-raleway text-left font-bold',
      dateClass: 'absolute top-[87px] left-[600px] text-[11pt] text-black font-raleway font-bold text-left',
      contentClass: 'absolute top-[220px] font-medium text-[14pt] w-[85%] text-left left-1/2 -translate-x-1/2 text-black'
   },
   elecom: {
      background: '/assets/elecom_letter_head.svg',
      referenceClass: 'absolute top-21 left-[495px] text-[11pt] text-white font-raleway text-left font-bold',
      dateClass: 'absolute top-21 left-[670px] text-[11pt] text-white font-raleway text-left font-bold',
      contentClass: 'absolute top-60 font-medium text-[14pt] w-[85%] text-left left-1/2 -translate-x-1/2 text-black'
   },
   president: {
      background: '/assets/president_letter_head.svg',
      referenceClass: 'absolute top-26 left-[560px] text-[11pt] text-black font-nasalization text-left',
      dateClass: 'absolute top-32 left-[560px] text-[11pt] text-black font-nasalization text-left',
      contentClass: 'absolute top-48 font-medium text-[14pt] w-[85%] text-left left-1/2 -translate-x-1/2 text-black'
   }
};

function Letterhead({ date, referenceNumber, content, letterHeadRef, viewMode, setContent, type = 'executive' }) {
   const config = MEMO_CONFIGS[type] || MEMO_CONFIGS['executive'];

   return (
      <section
         className="absolute top-0 left-0 origin-top-left overflow-hidden bg-white"
         ref={letterHeadRef}
         style={{ width: '794px', height: '1123px' }}
      >
         <img src={config.background} alt={`${type} Letterhead template`} className="pointer-events-none absolute inset-0 w-full h-full object-cover" />
         <div className="absolute inset-0 z-10">

            <div className={config.referenceClass}>{referenceNumber}</div>

            <div className={config.dateClass}>{date}</div>

            {viewMode === 'document' ? (
               <div className={config.contentClass}>
                  <SimpleEditor content={content} setContent={setContent} mode="document" />
               </div>
            ) : (
               <div className={`${config.contentClass} tiptap ProseMirror`} dangerouslySetInnerHTML={{ __html: typeof window !== 'undefined' ? DOMPurify.sanitize(content) : content }} />
            )}
         </div>
      </section>
   );
}

export default Letterhead;