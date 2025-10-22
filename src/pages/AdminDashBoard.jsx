import supabase from '../services/supabaseClient';
import { useEffect, useState } from 'react';
import MemoCard from '../components/MemoCard';
import { Link } from 'react-router-dom';
import { Plus, House } from 'lucide-react';
import Loading from '../components/Loading';

function AdminDashBoard() {
   const [fetchError, setFetchError] = useState(null);
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [order, setOrder] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         const { data, error } = await supabase
            .from('memo')
            .select()
            .order('created_at', { ascending: order });

         if (error) {
            setFetchError('Could not fetch memos');
            setData([]);
         } else {
            setData(data);
            setFetchError(null);
         }
         
         setLoading(false);
      };

      fetchData();
   }, [order]);

   // This function handles both the database and local state updates
   async function handleVisibility(reference, status) {
      setData(currentMemos =>
         currentMemos.map(memo =>
            memo.reference === reference
               ? { ...memo, is_published: !memo.is_published }
               : memo
         )
      );

      const { error } = await supabase
         .from('memo')
         .update({ is_published: !status })
         .eq('reference', reference);

      if (error) {
         console.error("Failed to update memo:", error);
         alert("Error: Could not update the memo's visibility.");
         // Revert the state to its original form
         setData(currentMemos =>
            currentMemos.map(memo =>
               memo.reference === reference
                  ? { ...memo, is_published: status } // Revert back to original status
                  : memo
            )
         );
      }
   }

   async function handleDelete(reference) {
      if (!window.confirm("Are you sure you want to delete this memo? This action cannot be undone.")) {
         return;
      }
      const originalData = [...data];

      setData(currentMemos =>
         currentMemos.filter(memo => memo.reference !== reference)
      );

      const { error } = await supabase
         .from('memo')
         .delete()
         .eq('reference', reference);

      if (error) {
         console.error("Failed to delete memo:", error);
         alert("Error: Could not delete the memo. Restoring the item.");
         setData(originalData);
      }
   }

   if (loading) return <Loading />;

   return (
      <div>
         <div className='page-title'>
            <Link to={'/'}>
               <button className="btn btn-primary">
                  <House size={20} />
               </button>
            </Link>
            <h1>Admin Dashboard</h1>
         </div>
         <Link to='/admin/create' className='plain-link'>
            <div className="create-memo" title='Create new memo'>
               <Plus size={50} />
               <p>Create New Memo</p>
            </div >
         </Link>

         <div className="filter-container">
            <h3>Date Created:</h3>
            <select name="order" id="order" onChange={e => setOrder(e.target.value === "true")}>
               <option value="false">Newest</option>
               <option value="true">Oldest</option>
            </select>
         </div>

         <div className="item-container">
            {fetchError && <h1 className='error-message'>{fetchError}</h1>}
            {data.map(item => (
               <MemoCard
                  key={item.id}
                  {...item}
                  // ISSUE 3 (FIXED): Pass the handler function as a prop
                  onToggleVisibility={handleVisibility}
                  onDelete={handleDelete}
               />
            ))}
         </div>
      </div>
   );
}

export default AdminDashBoard;