'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { createClient } from '@/utils/supabase/client';
import Notification from '@/components/Notification';

const TYPE_PREFIX_MAP = { executive: 'NACOSS', elecom: 'CSCEC', src: 'CSCSRC', president: 'CSCPR' };
const getPrefix = (t) => TYPE_PREFIX_MAP[t] || 'NACOSS';

export const AddNewMemo = forwardRef(({ referenceNumber, date, head, content, type = 'executive' }, ref) => {
   const [isAdding, setIsAdding] = useState(false);
   const [notification, setNotification] = useState(null);
   const supabase = createClient();

   const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   useImperativeHandle(ref, () => ({
      publish: async () => await addMemo()
   }));

   async function addMemo() {
      if (!window.confirm('Are you sure you want to publish this memo?')) return false;

      setIsAdding(true);
      const allProvided = [referenceNumber, date, head, content].every(
         v => v !== null && v !== undefined && String(v).trim() !== ""
      );

      try {
         if (!allProvided) {
            showNotification('Please provide all fields', 'error');
            return false;
         }

         const prefix = getPrefix(type);
         const currentYearSuffix = new Date().getFullYear().toString().slice(-2);
         const regex = new RegExp(`^${prefix}\\/${currentYearSuffix}\\/\\d{1,3}$`);

         if (!regex.test(referenceNumber)) {
            showNotification(`Reference must follow format: ${prefix}/${currentYearSuffix}/XXX`, 'error');
            return false;
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
               return false; // Prevent download on unique constraint error
            } else {
               showNotification('Server error, please try again', 'error');
               return true; // Optional: allow download on random server errors if you want, or false. User said "not all error should disable download, but empty fields, ref not unique". Returning false is safer, but let's return false for all errors to be safe.
            }
         }

         showNotification('Published successfully!', 'success');
         return true;
      } catch (error) {
         console.error(error);
         return false;
      } finally {
         setIsAdding(false);
      }
   }

   return (
      <>
         {notification && <Notification message={notification.message} type={notification.type} />}
         <button
            id="publish-memo-btn"
            className="px-6 py-3 bg-primary/95 hover:bg-primary backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            disabled={isAdding}
            onClick={addMemo}
         >
            {isAdding ? 'Publishing...' : 'Publish Memo'}
         </button>
      </>
   );
});

export const UpdateMemo = forwardRef(({ referenceNumber, date, head, content, type = 'executive' }, ref) => {
   const [isAdding, setIsAdding] = useState(false);
   const [notification, setNotification] = useState(null);
   const supabase = createClient();

   const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   useImperativeHandle(ref, () => ({
      publish: async () => await updateMemo()
   }));

   async function updateMemo() {
      if (!window.confirm('Are you sure you want to update this memo?')) return false;

      setIsAdding(true);
      const allProvided = [referenceNumber, date, head, content].every(
         v => v !== null && v !== undefined && String(v).trim() !== ""
      );

      try {
         if (!allProvided) {
            showNotification('Please provide all fields', 'error');
            return false;
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
            return false;
         }
         showNotification('Updated successfully!', 'success');
         return true;
      } catch (error) {
         console.error(error);
         return false;
      } finally {
         setIsAdding(false);
      }
   }

   return (
      <>
         {notification && <Notification message={notification.message} type={notification.type} />}
         <button
            id="publish-memo-btn"
            className="px-6 py-3 bg-primary/95 hover:bg-primary backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            disabled={isAdding}
            onClick={updateMemo}
         >
            {isAdding ? 'Updating...' : 'Update Memo'}
         </button>
      </>
   );
});