import supabase from '../services/supabaseClient';
import { useState } from 'react';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';

const adminUser = localStorage.getItem('adminUser');
const currentUser = adminUser ? JSON.parse(adminUser).email : null;

function AddNewMemo({ referenceNumber, date, head, content }) {
   const [isAdding, setIsAdding] = useState(false);
   const [notification, setNotification] = useState(null);
   const navigate = useNavigate();
   const REFERENCE_REGEX = /^NACOSS\/(25|26)\/\d{1,3}$/;

   const showNotification = (message, type) => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
   };

   const validateReferenceFormat = (reference) => {
      return REFERENCE_REGEX.test(reference);
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

         if (!validateReferenceFormat(referenceNumber)) {
            showNotification(`Reference must follow format:NACOSS/25/XXX or NACOSS/26/XXX where XXX is sequence number (1-3 digits)`, 'error');
            return;
         }

         const { error } = await supabase
            .from('memo')
            .insert({
               reference: referenceNumber,
               date: date,
               head: head,
               content: content,
               created_by: currentUser
            })
         if (error) {
            if (error.code === '23505') {
               showNotification('Reference already exists. Please use a different reference.', 'error');
               throw new Error('Reference number already exists. Please use a different reference.');
            } else {
               showNotification('Server error, please try again', 'error');
               throw new Error('supabase issue', error);
            }
         }
         showNotification('Published successfully!', 'success');
         navigate('/admin/dashboard');
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
            className={`btn btn-primary ${isAdding ? 'loading' : ''}`}
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
               date: date,
               head: head,
               content: content,
               last_edited_by: currentUser,
            })
            .eq('reference', referenceNumber)
         if (error) {
            showNotification('Server error, please try again', 'error');
            throw new Error('supabase issue', error);
         }
         showNotification('Updated successfully!', 'success');

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
            className={`btn btn-primary ${isAdding ? 'loading' : ''}`}
            disabled={isAdding}
            onClick={UpdateMemo}
         >
            Update Memo
         </button>
      </>
   )
}

export { AddNewMemo, UpdateMemo }