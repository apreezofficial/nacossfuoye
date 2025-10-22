/* eslint-disable no-unused-vars */
import { useState } from 'react';
import html2canvas from 'html2canvas';
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
      try {
         if (!elementRef.current) throw new Error('Element not found');

         const canvas = await html2canvas(elementRef.current, {
            scale: 7,
            letterRendering: true,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
         });

         const link = document.createElement('a');
         link.download = `${referenceNumber}.png`;
         link.href = canvas.toDataURL('image/png', 2.0);
         link.click();

         showNotification('PNG downloaded successfully!');
      } catch (error) {
         console.error('PNG download error:', error);
         showNotification('Failed to download PNG. Please try again.', 'error');
      } finally {
         setIsPNGLoading(false);
      }
   }

   return (
      <>
         {notification && <Notification message={notification.message} type={notification.type} />}
         <button
            className={`btn btn-primary ${isPNGLoading ? 'loading' : ''}`}
            onClick={downloadPNG}
            disabled={isPNGLoading}
         >
            <FileDown size={18} />
         </button>
      </>
   );
}

export default DownloadBtn;