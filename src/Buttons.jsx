/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Notification from './Notification';
import supabase from '../supabaseClient';

function Buttons({ elementRef, referenceNumber = 'document',
   date = new Date().toISOString().split('T')[0],
   head = null, content = null }) {


   const [isPDFLoading, setIsPDFLoading] = useState(false);
   const [isPNGLoading, setIsPNGLoading] = useState(false);
   const [isSaving, setIsSaving] = useState(false);
   const [notification, setNotification] = useState(null);

   const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000); // Clear after duration
   };

   // Download PDF
   async function downloadPDF() {
      setIsPDFLoading(true);
      try {
         if (!elementRef.current) throw new Error('Element not found');

         const canvas = await html2canvas(elementRef.current, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
         });

         const imgData = canvas.toDataURL('image/png', 2.0);
         const pdf = new jsPDF('p', 'pt', 'a4');

         const pageWidth = pdf.internal.pageSize.getWidth();
         const pageHeight = pdf.internal.pageSize.getHeight();
         const imgWidth = pageWidth;
         const imgHeight = (canvas.height * imgWidth) / canvas.width;

         pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
         pdf.save(`${referenceNumber}-${date}.pdf`);

         showNotification('PDF downloaded successfully!');
      } catch (error) {
         console.error('PDF download error:', error);
         showNotification('Failed to download PDF. Please try again.', 'error');
      } finally {
         setIsPDFLoading(false);
      }
   }

   // Download PNG
   async function downloadPNG() {
      setIsPNGLoading(true);
      try {
         if (!elementRef.current) throw new Error('Element not found');

         const canvas = await html2canvas(elementRef.current, {
            scale: 3,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
         });

         const link = document.createElement('a');
         link.download = `${referenceNumber}-${date}.png`;
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

   async function save(e) {
      setIsSaving(true);
      const allProvided = [referenceNumber, date, head, content].every(
         v => v !== null && v !== undefined && String(v).trim() !== ""
      );
      try {
         if (!allProvided) {
            showNotification('Please provide all field', 'error');
            throw new Error('Data not complete');
         };

         const { data, error } = await supabase
            .from('memo')
            .insert({
               reference: referenceNumber,
               date: date,
               head: head,
               content: content,
            })
         if (error) {
            showNotification('Server error, please try again', 'error');
            throw new Error('supabase issue');
         }
         showNotification('Saved successfully!', 'success');


      } catch (error) {
         console.log(error);
      } finally {
         setIsSaving(false);
      }
   }

   return (
      <div className="download-buttons">
         {notification && <Notification message={notification.message} type={notification.type} />}
         <button
            className={`btn btn-primary ${isPNGLoading ? 'loading' : ''}`}
            onClick={downloadPNG}
            disabled={isPNGLoading}
         >
            Download PNG
         </button>
         <button
            className={`btn btn-secondary ${isPDFLoading ? 'loading' : ''}`}
            onClick={downloadPDF}
            disabled={isPDFLoading}
         >
            Download PDF
         </button>

         <button
            className={`btn btn-secondary ${isSaving ? 'loading' : ''}`}
            onClick={save}
            disabled={isSaving}
         >
            Save
         </button>
      </div>
   );
}

export default Buttons;