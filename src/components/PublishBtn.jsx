import supabase from '../services/supabaseClient';
import { useState } from 'react';
import Notification from '../components/Notification';

function PublishBtn() {
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
      <button
         className={`btn btn-secondary ${isSaving ? 'loading' : ''}`}
         onClick={save}
         disabled={isSaving}
      >
         publish
      </button>
   )
}

export default PublishBtn