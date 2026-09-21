/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { toPng } from 'html-to-image';
import Notification from './Notification';
import { FileDown } from "lucide-react";

function DownloadBtn({ elementRef, referenceNumber = 'document'}) {
   const [isPNGLoading, setIsPNGLoading] = useState(false);
   const [notification, setNotification] = useState(null);

   const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000); // Clear after duration
   };

   // Download PNG
   async function downloadPNG() {
      setIsPNGLoading(true);
      
      const paper = elementRef.current;
      if (!paper) {
         showNotification('Element not found', 'error');
         setIsPNGLoading(false);
         return;
      }

      // 1. Save original transform
      const originalTransform = paper.style.transform;
      const originalOrigin = paper.style.transformOrigin;
      const originalTransition = paper.style.transition;

      try {
         // 2. Temporarily remove transform to capture full quality 794x1123 canvas
         paper.style.transition = 'none';
         paper.style.transform = 'none';
         paper.style.transformOrigin = 'top left';

         // Wait a tiny bit for the browser to register the transform removal
         await new Promise(r => setTimeout(r, 100));

         // 3. Render image data URL using html-to-image (supports modern CSS better than html2canvas)
         const dataUrl = await toPng(paper, {
            pixelRatio: 4, // 4 yields a ~3176x4492 image (approx 400 DPI), identical to a high-end CorelDRAW export
            backgroundColor: '#ffffff',
         });

         // 4. Download
         const link = document.createElement('a');
         link.download = `${referenceNumber || 'Memo'}.png`;
         link.href = dataUrl;
         link.click();

         showNotification('PNG downloaded successfully!', 'success');
      } catch (error) {
         console.error('PNG download error:', error);
         showNotification(`Download failed: ${error.message || 'Unknown error'}`, 'error');
      } finally {
         // 5. Restore transform immediately
         paper.style.transform = originalTransform;
         paper.style.transformOrigin = originalOrigin;
         paper.style.transition = originalTransition;
         
         setIsPNGLoading(false);
      }
   }

   return (
      <>
         {notification && <Notification message={notification.message} type={notification.type} />}
         <button
            aria-label="Download Memo as PNG"
            className={`inline-flex items-center justify-center p-3.5 rounded-xl text-white font-semibold border border-white/20 backdrop-blur-md transition-all duration-300 ease-out active:scale-[0.98] disabled:active:scale-100 ${isPNGLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary/95 hover:bg-primary'}`}
            onClick={downloadPNG}
            disabled={isPNGLoading}
         >
            {isPNGLoading ? (
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
               <FileDown size={20} />
            )}
         </button>
      </>
   );
}

export default DownloadBtn;