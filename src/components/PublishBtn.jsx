import supabase from '../services/supabaseClient';
import { useState } from 'react';
import Notification from '../components/Notification';

const adminUser = localStorage.getItem('adminUser');
const currentUser = adminUser ? JSON.parse(adminUser).email : null;

function AddNewMemo({ referenceNumber, date, head, content }) {
   const [isAdding, setIsAdding] = useState(false);
   const [notification, setNotification] = useState(null);

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
            showNotification('Please provide all field', 'error');
            throw new Error('Data not complete');
         };

         const { error } = await supabase
            .from('memo')
            .insert({
               reference: referenceNumber,
               date: date,
               head: head,
               content: content,
               created_by: currentUser,
               is_published: true
            })
         if (error) {
            showNotification('Server error, please try again', 'error');
            throw new Error('supabase issue');
         }
         showNotification('Saved successfully!', 'success');

      } catch (error) {
         console.log(error);
      } finally {
         setIsAdding(false);
      }
   }

   return (
      <>
         {notification && <Notification message={notification.message} type={notification.type} />}
         <button
            className={`btn btn-primary`}
            disabled={isAdding}
            onClick={addMemo}
         >
            Publish Memo
         </button>
      </>
   )
}

function UpdateMemo({ referenceNumber, date, head, content }) {
   const [isAdding, setIsAdding] = useState(false);
   const [notification, setNotification] = useState(null);

   const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   async function UpdateMemo() {
      setIsAdding(true);
      const allProvided = [referenceNumber, date, head, content].every(
         v => v !== null && v !== undefined && String(v).trim() !== ""
      );
      try {
         if (!allProvided) {
            showNotification('Please provide all field', 'error');
            throw new Error('Data not complete');
         };

         const { error } = await supabase
            .from('memo')
            .update({
               ...updates,
               date: date,
               head: head,
               content: content,
               last_edited_by: currentUser,
            })
         .eq('reference', referenceNumber)
         if (error) {
            showNotification('Server error, please try again', 'error');
            throw new Error('supabase issue');
         }
         showNotification('Saved successfully!', 'success');

      } catch (error) {
         console.log(error);
      } finally {
         setIsAdding(false);
      }
   }

   return (
      <>
         {notification && <Notification message={notification.message} type={notification.type} />}
         <button
            className={`btn btn-primary`}
            disabled={isAdding}
            onClick={UpdateMemo}
         >
            Update Memo
         </button>
      </>
   )
}

export {AddNewMemo, UpdateMemo}