'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Notification from '@/components/Notification';

export function AddNewMemo({ referenceNumber, date, head, content, type = 'executive' }) {
   const [isAdding, setIsAdding] = useState(false);
   const [notification, setNotification] = useState(null);
   const router = useRouter();
   const supabase = createClient();
   const REFERENCE_REGEX = /^NACOSS\/(25|26)\/\d{1,3}$/;

   const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   async function addMemo() {
      setIsAdding(true);
      const allProvided = [referenceNumber, date, head, content].every(
         v => v !== null && v !== undefined && String(v).trim() !== ""
      );

      try {
         if (!allProvided) {
            showNotification('Please provide all fields', 'error');
            return;
         }

         if (!REFERENCE_REGEX.test(referenceNumber)) {
            showNotification(`Reference must follow format: NACOSS/25/XXX`, 'error');
            return;
         }

         const { data: { user } } = await supabase.auth.getUser();

         const { error } = await supabase.from('memo').insert({
            reference: referenceNumber,
            date: date,
            head: head,
            content: content,
            type: type,
            created_by: user?.email
         });

         if (error) {
            if (error.code === '23505') {
               showNotification('Reference already exists.', 'error');
            } else {
               showNotification('Server error, please try again', 'error');
            }
            return;
         }

         showNotification('Published successfully!', 'success');
         router.push('/admin/dashboard');
      } catch (error) {
         console.error(error);
      } finally {
         setIsAdding(false);
      }
   }

   return (
      <>
         {notification && <Notification message={notification.message} type={notification.type} />}
         <button
            className="px-6 py-3 bg-primary/95 hover:bg-primary backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            disabled={isAdding}
            onClick={addMemo}
         >
            {isAdding ? 'Publishing...' : 'Publish Memo'}
         </button>
      </>
   );
}

export function UpdateMemo({ referenceNumber, date, head, content, type = 'executive' }) {
   const [isAdding, setIsAdding] = useState(false);
   const [notification, setNotification] = useState(null);
   const supabase = createClient();

   const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   async function updateMemo() {
      setIsAdding(true);
      const allProvided = [referenceNumber, date, head, content].every(
         v => v !== null && v !== undefined && String(v).trim() !== ""
      );

      try {
         if (!allProvided) {
            showNotification('Please provide all fields', 'error');
            return;
         }

         const { data: { user } } = await supabase.auth.getUser();

         const { error } = await supabase.from('memo').update({
            date: date,
            head: head,
            content: content,
            type: type,
            last_edited_by: user?.email,
         }).eq('reference', referenceNumber);

         if (error) {
            showNotification('Server error, please try again', 'error');
            return;
         }
         showNotification('Updated successfully!', 'success');
      } catch (error) {
         console.error(error);
      } finally {
         setIsAdding(false);
      }
   }

   return (
      <>
         {notification && <Notification message={notification.message} type={notification.type} />}
         <button
            className="px-6 py-3 bg-primary/95 hover:bg-primary backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            disabled={isAdding}
            onClick={updateMemo}
         >
            {isAdding ? 'Updating...' : 'Update Memo'}
         </button>
      </>
   );
}